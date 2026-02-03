package com.shop.proyect.sitoinformatic.controller;

import com.shop.proyect.sitoinformatic.dto.PCRequirementRequest;
import com.shop.proyect.sitoinformatic.service.AssistantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/assistant")
@CrossOrigin(origins = "*") // Permite que el Frontend se conecte sin bloqueos
public class AssistantController {

    @Autowired
    private AssistantService assistantService;

    @PostMapping("/build")
    public ResponseEntity<?> buildConfiguration(@RequestBody PCRequirementRequest request) {
        try {
            // Llamamos al servicio que ya tiene las validaciones de campos vacíos
            Map<String, Object> configuration = assistantService.buildConfiguration(request);
            
            if (configuration == null || configuration.isEmpty()) {
                return ResponseEntity.status(404).body("No se encontraron componentes que se ajusten al presupuesto.");
            }
            
            return ResponseEntity.ok(configuration);
            
        } catch (IllegalArgumentException e) {
            // Si falta el presupuesto o el uso, devolvemos un error 400 claro
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            // Error genérico para cualquier otro fallo inesperado
            return ResponseEntity.status(500).body("Error interno al generar la configuración: " + e.getMessage());
        }
    }
}