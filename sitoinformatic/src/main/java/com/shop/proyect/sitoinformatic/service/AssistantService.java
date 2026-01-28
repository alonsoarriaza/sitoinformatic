package com.shop.proyect.sitoinformatic.service;

import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.stream.Stream;

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

    if (use.contains("GAMING") && budget.compareTo(new BigDecimal("400")) < 0) {
        return "El presupuesto es demasiado bajo para un PC Gaming. Considera subir a 600€ para una experiencia fluida.";
    }

    if (use.contains("EDICION") && budget.compareTo(new BigDecimal("700")) < 0) {
        return "Para edición de vídeo profesional, el presupuesto actual es insuficiente. Se recomiendan al menos 800€.";
    }

    return "OK"; 
}
public Component selectCpu(BigDecimal totalBudget){

    BigDecimal cpuMaxPrice = totalBudget.multiply(new BigDecimal("0.25"));

    return componentRepository.findAll().stream()
        .filter(c -> c.getCategory().equalsIgnoreCase("Procesador"))// Solo procesadores
        .filter(c -> c.getPrice().compareTo(cpuMaxPrice) <= 0)// Que no superen el precio máximo
        .sorted((c1, c2) -> c2.getPrice().compareTo(c1.getPrice()))// Ordenar de mayor a menor precio
        .findFirst()// Coge el mejor 
        .orElse(null); // Si no hay ninguno, devolvemos null
}
public Component selectMotherboard(String socket, BigDecimal totalBudget) {
    BigDecimal maxPrice = totalBudget.multiply(new BigDecimal("0.15"));

    return componentRepository.findAll().stream()
        .filter(c -> c.getCategory().equalsIgnoreCase("Placa Base")) // Solo placas
        .filter(c -> c.getCompatibilityTag().equalsIgnoreCase(socket)) // ¡QUE SEA EL MISMO SOCKET!
        .filter(c -> c.getPrice().compareTo(maxPrice) <= 0) // Límite de precio
        .sorted((c1, c2) -> c2.getPrice().compareTo(c1.getPrice())) // La mejor primero
        .findFirst()
        .orElse(null);
}
public Component selectGpu(BigDecimal totalBudget) { 
    BigDecimal maxPrice = totalBudget.multiply(new BigDecimal("0.40"));

    return componentRepository.findAll().stream()
        .filter(c -> c.getCategory().equalsIgnoreCase("Tarjeta Gráfica"))
        .filter(c -> c.getPrice().compareTo(maxPrice) <= 0)
        .sorted((c1, c2) -> c2.getPrice().compareTo(c1.getPrice()))
        .findFirst()
        .orElse(null);
}
public Component selectRam(BigDecimal totalBudget) {
    BigDecimal maxPrice = totalBudget.multiply(new BigDecimal("0.10"));

    return componentRepository.findAll().stream()
        // Cambiamos "Memoria RAM" por "RAM" para que coincida con tu SQL
        .filter(c -> c.getCategory().equalsIgnoreCase("RAM")) 
        .filter(c -> c.getPrice().compareTo(maxPrice) <= 0)
        .sorted((c1, c2) -> c2.getPrice().compareTo(c1.getPrice()))
        .findFirst()
        .orElse(null);
}
}   

