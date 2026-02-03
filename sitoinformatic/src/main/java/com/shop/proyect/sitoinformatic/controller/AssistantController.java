package com.shop.proyect.sitoinformatic.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shop.proyect.sitoinformatic.dto.PCRequirementRequest;
import com.shop.proyect.sitoinformatic.service.AssistantService;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping ("/api/assistant")
public class AssistantController {

@Autowired private AssistantService assistantService;    
@PostMapping("/build")
public ResponseEntity<?> processRequirements(@RequestBody PCRequirementRequest request) {
    // 1. Validar reglas de negocio
    String msg = assistantService.validateRequirements(request);
    if (!msg.equals("OK")) return ResponseEntity.badRequest().body(msg);

    // 2. Generar la configuración completa
    Map<String, Object> response = assistantService.buildConfiguration(request);
    
    // 3. Si no hay CPU, es que el presupuesto no llega
    if (response == null) {
        return ResponseEntity.status(404).body("No se encontraron componentes para este presupuesto.");
    }

    return ResponseEntity.ok(response);
}
}