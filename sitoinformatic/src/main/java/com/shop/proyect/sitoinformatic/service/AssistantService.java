package com.shop.proyect.sitoinformatic.service;

import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import com.shop.proyect.sitoinformatic.dto.PCRequirementRequest;
import com.shop.proyect.sitoinformatic.model.Component;
import com.shop.proyect.sitoinformatic.repository.ComponentRepository;

@Service
public class AssistantService {

    @Autowired
    private ComponentRepository componentRepository;

    public String validateRequirements(PCRequirementRequest request) {
        BigDecimal budget = request.getBudget();
        String use = request.getMainUse().toUpperCase();

        // Validación de presupuesto mínimo por uso
        if (use.contains("GAMING") && budget.compareTo(new BigDecimal("400")) < 0) {
            return "Presupuesto insuficiente para Gaming.";
        }
        return "OK";
    }

    // Buscador genérico: Filtra por categoría, stock, compatibilidad y precio máximo
    private Component findBestComponent(String category, String compatibility, BigDecimal maxPrice) {
        return componentRepository.findAll().stream()
            .filter(c -> c.getCategory().equalsIgnoreCase(category))
            .filter(c -> c.getStock() > 0) 
            .filter(c -> compatibility == null || c.getCompatibilityTag().equalsIgnoreCase(compatibility))
            .filter(c -> c.getPrice().compareTo(maxPrice) <= 0)
            .sorted((c1, c2) -> c2.getPrice().compareTo(c1.getPrice())) // El más potente primero
            .findFirst()
            .orElse(null);
    }

    public Map<String, Object> buildConfiguration(PCRequirementRequest request) {
        BigDecimal total = request.getBudget();
        String use = request.getMainUse().toUpperCase();
        
        // Reparto de presupuesto (Porcentajes)
        BigDecimal cpuPerc = new BigDecimal("0.25");
        BigDecimal gpuPerc = use.contains("GAMING") ? new BigDecimal("0.40") : new BigDecimal("0.10");
        BigDecimal moboPerc = new BigDecimal("0.15");
        BigDecimal ramPerc = new BigDecimal("0.10");
        BigDecimal storagePerc = new BigDecimal("0.10");

        Map<String, Component> components = new LinkedHashMap<>();

        // 1. CPU (Base de la configuración)
        Component cpu = findBestComponent("Procesador", null, total.multiply(cpuPerc));
        if (cpu == null) return null;
        components.put("CPU", cpu);

        // 2. Placa Base (Filtrada por Socket de CPU)
        Component mobo = findBestComponent("Placa Base", cpu.getCompatibilityTag(), total.multiply(moboPerc));
        components.put("Motherboard", mobo);

        // 3. GPU, RAM y Almacenamiento
        components.put("GPU", findBestComponent("Tarjeta Gráfica", null, total.multiply(gpuPerc)));
        components.put("RAM", findBestComponent("RAM", null, total.multiply(ramPerc)));
        components.put("Storage", findBestComponent("Almacenamiento", null, total.multiply(storagePerc)));

        // Filtrado de nulos y cálculo de coste final
        List<Component> selectedList = components.values().stream()
                .filter(Objects::nonNull)
                .collect(Collectors.toList());

        BigDecimal totalSpent = selectedList.stream()
                .map(Component::getPrice)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        // Respuesta estructurada
        Map<String, Object> result = new HashMap<>();
        result.put("config", selectedList);
        result.put("totalPrice", totalSpent);
        result.put("savings", total.subtract(totalSpent));
        
        return result;
    }
}
