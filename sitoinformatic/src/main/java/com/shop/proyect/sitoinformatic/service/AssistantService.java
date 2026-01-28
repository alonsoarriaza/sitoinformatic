package com.shop.proyect.sitoinformatic.service;

import org.springframework.stereotype.Service;

import java.math.BigDecimal;

import org.springframework.beans.factory.annotation.Autowired;

import com.shop.proyect.sitoinformatic.dto.PCRequirementRequest;
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
   
    
}
