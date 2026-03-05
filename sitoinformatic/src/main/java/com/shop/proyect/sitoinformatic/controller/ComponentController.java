package com.shop.proyect.sitoinformatic.controller;

import com.shop.proyect.sitoinformatic.dto.PCRequirementRequest;
import com.shop.proyect.sitoinformatic.model.Component;
import com.shop.proyect.sitoinformatic.repository.ComponentRepository;
import com.shop.proyect.sitoinformatic.service.AssistantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/components")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5175"})
public class ComponentController {

    private final AssistantService assistantService;
    
    @Autowired
    private ComponentRepository componentRepository; // Inyectamos el repositorio para el catálogo

    public ComponentController(AssistantService assistantService) {
        this.assistantService = assistantService;
    }

    //  ENDPOINT PARA EL CATÁLOGO 
    @GetMapping
    public ResponseEntity<List<Component>> getAllComponents() {
        // Retorna todos los componentes del import.sql
        return ResponseEntity.ok(componentRepository.findAll());
    }

    // ENDPOINT PARA EL CONFIGURADOR IA 
    @PostMapping("/configurador")
    public ResponseEntity<Map<String, Object>> generatePC(@RequestBody PCRequirementRequest request) {
        try {
            Map<String, Object> config = assistantService.buildConfiguration(request);
            return ResponseEntity.ok(config);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}