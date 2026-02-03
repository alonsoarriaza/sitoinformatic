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
        
        Map<String, Double> percentages = getPercentages(use, request.isIncludePeripherals());
        
        // Selección de piezas Core con nombres de columna snake_case
        config.put("CPU", findBest(budget.multiply(BigDecimal.valueOf(percentages.get("CPU"))), "CPU", null));
        config.put("GPU", findBest(budget.multiply(BigDecimal.valueOf(percentages.get("GPU"))), "GPU", null));
        config.put("RAM", findBest(budget.multiply(BigDecimal.valueOf(percentages.get("RAM"))), "RAM", null));
        config.put("SSD", findBest(budget.multiply(BigDecimal.valueOf(percentages.get("SSD"))), "SSD", null));

        if (request.isIncludePeripherals()) {
            config.put("Monitor", findBest(budget.multiply(new BigDecimal("0.15")), "MONITOR", null));
            config.put("Teclado", findBest(budget.multiply(new BigDecimal("0.05")), "TECLADO", null));
            config.put("Raton", findBest(budget.multiply(new BigDecimal("0.05")), "RATON", null));
        }
        return config;
    }

   private Component findBest(BigDecimal maxPrice, String category, String tag) {
    // 1. Buscamos todos los componentes con stock
    List<Component> candidates = componentRepository.findByCategoryAndStockGreaterThan(category, 0);

    // 2. Filtramos por compatibilidad (si aplica)
    List<Component> compatibleCandidates = candidates.stream()
        .filter(c -> tag == null || c.getCompatibilityTag().equals(tag) || c.getCompatibilityTag().equals("UNIVERSAL"))
        .toList();

    // 3. Intentamos encontrar el mejor que entre en el precio
    return compatibleCandidates.stream()
        .filter(c -> c.getPrice().compareTo(maxPrice) <= 0)
        .max(Comparator.comparing(Component::getPrice))
        // 4. SI NO HAY NADA: Devolvemos el más barato de la tienda para que no sea null
        .orElseGet(() -> compatibleCandidates.stream()
            .min(Comparator.comparing(Component::getPrice))
            .orElse(null));
}

    private void validateInputs(PCRequirementRequest request) {
        if (request.getBudget() == null || request.getBudget().compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("El presupuesto debe ser un número positivo real.");
        }
        if (request.getMainUse() == null || request.getMainUse().isEmpty()) {
            throw new IllegalArgumentException("Debes indicar el uso (Gaming, Oficina o Streaming).");
        }
    }

    private Map<String, Double> getPercentages(String use, boolean hasPeripherals) {
        Map<String, Double> p = new HashMap<>();
        double factor = hasPeripherals ? 0.70 : 1.0;
        if (use.equals("STREAMING")) {
            p.put("CPU", 0.30 * factor); p.put("GPU", 0.40 * factor); p.put("RAM", 0.15 * factor); p.put("SSD", 0.15 * factor);
        } else if (use.equals("GAMING")) {
            p.put("CPU", 0.20 * factor); p.put("GPU", 0.50 * factor); p.put("RAM", 0.15 * factor); p.put("SSD", 0.15 * factor);
        } else { // OFICINA
            p.put("CPU", 0.50 * factor); p.put("GPU", 0.10 * factor); p.put("RAM", 0.20 * factor); p.put("SSD", 0.20 * factor);
        }
        return p;
    }
}