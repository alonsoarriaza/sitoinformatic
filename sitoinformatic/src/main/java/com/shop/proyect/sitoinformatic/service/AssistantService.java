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
        validateInputs(request);
        Map<String, Object> config = new LinkedHashMap<>();
        BigDecimal budget = request.getBudget();
        String use = request.getMainUse().toUpperCase();
        
        // Ajustamos presupuesto para hardware (75% si hay periféricos, 100% si no)
        BigDecimal hardwareBudget = request.isIncludePeripherals() ? budget.multiply(new BigDecimal("0.75")) : budget;
        
        Map<String, Double> percentages = getPercentages(use);
        
        // Sincronizado con las categorías de tu import.sql
        config.put("Procesador", findBest(hardwareBudget.multiply(BigDecimal.valueOf(percentages.get("CPU"))), "CPU", null));
        config.put("Placa Base", findBest(hardwareBudget.multiply(BigDecimal.valueOf(percentages.get("MOTHERBOARD"))), "PLACA_BASE", null));
        config.put("Memoria RAM", findBest(hardwareBudget.multiply(BigDecimal.valueOf(percentages.get("RAM"))), "RAM", null));
        config.put("Tarjeta Gráfica", findBest(hardwareBudget.multiply(BigDecimal.valueOf(percentages.get("GPU"))), "GPU", null));
        config.put("Almacenamiento", findBest(hardwareBudget.multiply(BigDecimal.valueOf(percentages.get("SSD"))), "SSD", null));
        config.put("Fuente Alimentación", findBest(hardwareBudget.multiply(BigDecimal.valueOf(percentages.get("PSU"))), "PSU", null));
        config.put("Caja/Chasis", findBest(hardwareBudget.multiply(BigDecimal.valueOf(percentages.get("CASE"))), "CASE", null));

        if (request.isIncludePeripherals()) {
            BigDecimal periphBudget = budget.multiply(new BigDecimal("0.25"));
            config.put("Monitor", findBest(periphBudget.multiply(new BigDecimal("0.60")), "MONITOR", null));
            config.put("Teclado", findBest(periphBudget.multiply(new BigDecimal("0.20")), "TECLADO", null));
            config.put("Ratón", findBest(periphBudget.multiply(new BigDecimal("0.20")), "RATON", null));
        }
        return config;
    }

    private Map<String, Double> getPercentages(String use) {
        Map<String, Double> p = new HashMap<>();
        // Distribución del 100% del presupuesto de la torre
        switch (use) {
            case "STREAMING" -> {
                p.put("CPU", 0.25); p.put("GPU", 0.35); p.put("RAM", 0.12);
                p.put("SSD", 0.10); p.put("MOTHERBOARD", 0.08); p.put("PSU", 0.05); p.put("CASE", 0.05);
            }
            case "GAMING" -> {
                p.put("CPU", 0.20); p.put("GPU", 0.40); p.put("RAM", 0.10);
                p.put("SSD", 0.10); p.put("MOTHERBOARD", 0.10); p.put("PSU", 0.05); p.put("CASE", 0.05);
            }
            default -> { // OFICINA
                p.put("CPU", 0.40); p.put("GPU", 0.05); p.put("RAM", 0.15);
                p.put("SSD", 0.15); p.put("MOTHERBOARD", 0.15); p.put("PSU", 0.05); p.put("CASE", 0.05);
            }
        }
        return p;
    }

    private Component findBest(BigDecimal maxPrice, String category, String tag) {
        List<Component> candidates = componentRepository.findByCategoryAndStockGreaterThan(category, 0);

        List<Component> compatibleCandidates = candidates.stream()
            .filter(c -> tag == null || c.getCompatibilityTag().equals(tag) || c.getCompatibilityTag().equals("UNIVERSAL"))
            .toList();

        return compatibleCandidates.stream()
            .filter(c -> c.getPrice().compareTo(maxPrice) <= 0)
            .max(Comparator.comparing(Component::getPrice))
            .orElseGet(() -> compatibleCandidates.stream()
                .min(Comparator.comparing(Component::getPrice))
                .orElse(null));
    }

    private void validateInputs(PCRequirementRequest request) {
    BigDecimal budget = request.getBudget();
    String use = request.getMainUse().toUpperCase();

    if (budget == null || budget.compareTo(BigDecimal.ZERO) <= 0) {
        throw new IllegalArgumentException("El presupuesto debe ser un número positivo.");
    }

    // Validación de realismo para tu TFG
    if (use.equals("GAMING") && budget.compareTo(new BigDecimal("450")) < 0) {
        throw new IllegalArgumentException("Presupuesto insuficiente: Un PC Gaming funcional requiere al menos 450€.");
    }
    
    if (use.equals("STREAMING") && budget.compareTo(new BigDecimal("600")) < 0) {
        throw new IllegalArgumentException("Presupuesto insuficiente: Para Streaming/Edición se recomiendan al menos 600€.");
    }

    if (budget.compareTo(new BigDecimal("200")) < 0) {
        throw new IllegalArgumentException("Presupuesto demasiado bajo: No es posible montar un PC completo por menos de 200€.");
    }
}
}