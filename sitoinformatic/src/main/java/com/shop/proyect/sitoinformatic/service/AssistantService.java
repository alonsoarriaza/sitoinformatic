package com.shop.proyect.sitoinformatic.service;

import com.shop.proyect.sitoinformatic.dto.PCRequirementRequest;
import com.shop.proyect.sitoinformatic.model.Component;
import com.shop.proyect.sitoinformatic.repository.ComponentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.*;

@Service
public class AssistantService {

    @Autowired
    private ComponentRepository componentRepository;

    public Map<String, Object> buildConfiguration(PCRequirementRequest request) {
        // 1. Validar mínimos de presupuesto según el uso
        validateInputs(request);
        
        Map<String, Object> config = new LinkedHashMap<>();
        BigDecimal totalBudget = request.getBudget();
        String use = request.getMainUse().toUpperCase();
        
        // 2. Separar presupuesto: 75% Hardware, 25% Periféricos (si aplica)
        BigDecimal hardwareBudget = request.isIncludePeripherals() ? 
            totalBudget.multiply(new BigDecimal("0.75")) : totalBudget;

        Map<String, Double> percentages = getPercentages(use);
        
        // Orden de prioridad para gastar el dinero
        String[] ordenBusqueda = {"GPU", "CPU", "PLACA_BASE", "RAM", "SSD", "PSU", "CASE"};
        
        BigDecimal presupuestoRestante = hardwareBudget;
        BigDecimal sumaPorcentajesRestantes = new BigDecimal("1.0");

        // 3. Bucle de búsqueda con arrastre de dinero sobrante
        for (String cat : ordenBusqueda) {
            // Saltamos GPU en Oficina si el presupuesto es muy bajo
            if (cat.equals("GPU") && use.equals("OFICINA") && hardwareBudget.compareTo(new BigDecimal("500")) < 0) {
                config.put(cat, null);
                continue;
            }

            Double porcentajeAsignado = percentages.get(cat);
            // Calculamos cuánto le toca a esta pieza del dinero que queda
            BigDecimal presupuestoPieza = presupuestoRestante
                .multiply(BigDecimal.valueOf(porcentajeAsignado))
                .divide(sumaPorcentajesRestantes, 2, RoundingMode.HALF_UP);

            Component best = findBestPossible(presupuestoPieza, cat);
            
            if (best != null) {
                config.put(cat, best);
                presupuestoRestante = presupuestoRestante.subtract(best.getPrice());
            } else {
                config.put(cat, null);
            }
            
            // Actualizamos la tarta de porcentajes para la siguiente pieza
            sumaPorcentajesRestantes = sumaPorcentajesRestantes.subtract(BigDecimal.valueOf(porcentajeAsignado));
        }

        // 4. Lógica de Periféricos (Solo si se solicitan)
        if (request.isIncludePeripherals()) {
            BigDecimal pBudget = totalBudget.multiply(new BigDecimal("0.25"));
            config.put("Monitor", findBestPossible(pBudget.multiply(new BigDecimal("0.70")), "MONITOR"));
            config.put("Teclado", findBestPossible(pBudget.multiply(new BigDecimal("0.15")), "TECLADO"));
            config.put("Ratón", findBestPossible(pBudget.multiply(new BigDecimal("0.15")), "RATON"));
        }

        return config;
    }

    private Component findBestPossible(BigDecimal maxPrice, String category) {
        List<Component> allOfCat = componentRepository.findAll().stream()
            .filter(c -> c.getCategory().equalsIgnoreCase(category) && c.getStock() > 0)
            .toList();

        if (allOfCat.isEmpty()) return null;

        // Intentar encontrar la mejor pieza que no pase del precio máximo
        return allOfCat.stream()
            .filter(c -> c.getPrice().compareTo(maxPrice) <= 0)
            .max(Comparator.comparing(Component::getPrice))
            // Si el presupuesto es tan bajo que nada entra, dar la más barata (Salvavidas)
            .orElseGet(() -> allOfCat.stream().min(Comparator.comparing(Component::getPrice)).orElse(null));
    }

    private void validateInputs(PCRequirementRequest request) {
        BigDecimal b = request.getBudget();
        String use = request.getMainUse().toUpperCase();

        if (b == null) throw new IllegalArgumentException("El presupuesto es obligatorio.");

        // Mínimos solicitados para realismo profesional
        if (use.equals("OFICINA") && b.compareTo(new BigDecimal("250")) < 0) {
            throw new IllegalArgumentException("Mínimo 250€ para Oficina.");
        }
        if (use.equals("GAMING") && b.compareTo(new BigDecimal("550")) < 0) {
            throw new IllegalArgumentException("Mínimo 550€ para Gaming.");
        }
        if (use.equals("STREAMING") && b.compareTo(new BigDecimal("700")) < 0) {
            throw new IllegalArgumentException("Mínimo 700€ para Streaming/Edición.");
        }
    }

    private Map<String, Double> getPercentages(String use) {
        Map<String, Double> p = new HashMap<>();
        switch (use) {
            case "GAMING" -> {
                p.put("GPU", 0.45); p.put("CPU", 0.20); p.put("PLACA_BASE", 0.10);
                p.put("RAM", 0.10); p.put("SSD", 0.07); p.put("PSU", 0.05); p.put("CASE", 0.03);
            }
            case "STREAMING" -> {
                p.put("CPU", 0.35); p.put("GPU", 0.30); p.put("PLACA_BASE", 0.10); // Corregido el nombre
                p.put("RAM", 0.10); p.put("SSD", 0.07); p.put("PSU", 0.05); p.put("CASE", 0.03);
            }
            default -> { // OFICINA
                p.put("CPU", 0.45); p.put("GPU", 0.05); p.put("PLACA_BASE", 0.15);
                p.put("RAM", 0.15); p.put("SSD", 0.10); p.put("PSU", 0.05); p.put("CASE", 0.05);
            }
        }
        return p;
    }
}