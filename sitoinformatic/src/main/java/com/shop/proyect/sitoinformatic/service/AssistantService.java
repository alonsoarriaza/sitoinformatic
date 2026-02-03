package com.shop.proyect.sitoinformatic.service;

import com.shop.proyect.sitoinformatic.dto.PCRequirementRequest;
import com.shop.proyect.sitoinformatic.model.Component;
import com.shop.proyect.sitoinformatic.repository.ComponentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;

@Service
public class AssistantService {

    @Autowired
    private ComponentRepository componentRepository;

    public Map<String, Object> buildConfiguration(PCRequirementRequest request) {
        // 1. VALIDACIÓN TOTAL (Evita campos vacíos)
        validateInputs(request);

        Map<String, Object> config = new LinkedHashMap<>();
        BigDecimal budget = request.getBudget();
        String use = request.getMainUse().toUpperCase();
        
        // 2. REPARTO DINÁMICO DE PRESUPUESTO
        Map<String, Double> percentages = getPercentages(use, request.isIncludePeripherals());
        
        // 3. SELECCIÓN DE COMPONENTES CORE (Torre)
        // Buscamos la CPU primero para marcar el Socket
        Component cpu = findBest(budget.multiply(BigDecimal.valueOf(percentages.get("CPU"))), "CPU", null);
        config.put("CPU", cpu);

        if (cpu != null) {
            String socket = cpu.getCompatibilityTag();
            config.put("Placa Base", findBest(budget.multiply(BigDecimal.valueOf(percentages.get("MOBO"))), "PLACA_BASE", socket));
        }

        config.put("GPU", findBest(budget.multiply(BigDecimal.valueOf(percentages.get("GPU"))), "GPU", "UNIVERSAL"));
        config.put("RAM", findBest(budget.multiply(BigDecimal.valueOf(percentages.get("RAM"))), "RAM", "UNIVERSAL"));
        config.put("Almacenamiento", findBest(budget.multiply(BigDecimal.valueOf(percentages.get("SSD"))), "SSD", "UNIVERSAL"));

        // 4. LÓGICA DE PERIFÉRICOS (Si el usuario los marca)
        if (request.isIncludePeripherals()) {
            config.put("Monitor", findBest(budget.multiply(new BigDecimal("0.15")), "MONITOR", "UNIVERSAL"));
            config.put("Teclado", findBest(budget.multiply(new BigDecimal("0.05")), "TECLADO", "UNIVERSAL"));
            config.put("Raton", findBest(budget.multiply(new BigDecimal("0.04")), "RATON", "UNIVERSAL"));
        }

        return config;
    }

    // MÉTODO AUXILIAR PARA BUSCAR LA MEJOR PIEZA (Sin errores)
    private Component findBest(BigDecimal maxPrice, String category, String compatibilityTag) {
        List<Component> candidates = componentRepository.findByCategoryAndStockGreaterThan(category, 0);

        return candidates.stream()
            .filter(c -> c.getPrice().compareTo(maxPrice) <= 0)
            .filter(c -> compatibilityTag == null || c.getCompatibilityTag().equals(compatibilityTag) || c.getCompatibilityTag().equals("UNIVERSAL"))
            .max(Comparator.comparing(Component::getPrice))
            .orElse(null);
    }

    private void validateInputs(PCRequirementRequest request) {
        if (request.getBudget() == null || request.getBudget().compareTo(new BigDecimal("350")) < 0) {
            throw new IllegalArgumentException("El presupuesto es obligatorio y debe ser al menos de 350€.");
        }
        if (request.getMainUse() == null || request.getMainUse().trim().isEmpty()) {
            throw new IllegalArgumentException("El uso (Gaming, Oficina o Streaming) es obligatorio.");
        }
    }

    private Map<String, Double> getPercentages(String use, boolean hasPeripherals) {
        Map<String, Double> p = new HashMap<>();
        double factor = hasPeripherals ? 0.75 : 1.0; // Si hay periféricos, reducimos presupuesto de la torre

        switch (use) {
            case "STREAMING":
                p.put("CPU", 0.35 * factor);
                p.put("GPU", 0.30 * factor);
                p.put("RAM", 0.15 * factor);
                p.put("MOBO", 0.10 * factor);
                p.put("SSD", 0.10 * factor);
                break;
            case "GAMING":
                p.put("GPU", 0.45 * factor);
                p.put("CPU", 0.20 * factor);
                p.put("RAM", 0.10 * factor);
                p.put("MOBO", 0.15 * factor);
                p.put("SSD", 0.10 * factor);
                break;
            default: // OFICINA
                p.put("CPU", 0.45 * factor);
                p.put("GPU", 0.05 * factor);
                p.put("RAM", 0.20 * factor);
                p.put("MOBO", 0.15 * factor);
                p.put("SSD", 0.15 * factor);
                break;
        }
        return p;
    }
}