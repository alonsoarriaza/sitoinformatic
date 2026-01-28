package com.shop.proyect.sitoinformatic.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shop.proyect.sitoinformatic.dto.PCRequirementRequest;
import com.shop.proyect.sitoinformatic.service.AssistantService;
import com.shop.proyect.sitoinformatic.model.Component;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;




@RestController
@RequestMapping ("/api/assistant")
public class AssistantController {

@Autowired private AssistantService assistantService;    
@PostMapping("/build")
public ResponseEntity<?> processRequierements(@RequestBody PCRequirementRequest request) {
    
    // 1. Validación de presupuesto.
    String validationMessage = assistantService.validateRequirements(request);
    if (!validationMessage.equals("OK")) {
        return ResponseEntity.badRequest().body(validationMessage);
    }

    // 2. Selección de CPU.
    Component selectedCpu = assistantService.selectCpu(request.getBudget());
    if (selectedCpu == null) {
        return ResponseEntity.status(404).body("No se encontraron procesadores que se ajusten a ese presupuesto.");
    }
    // 3. Selección de Placa Base (Usamos 'selectedCpu' para obtener el tag).
    Component mobo = assistantService.selectMotherboard(selectedCpu.getCompatibilityTag(), request.getBudget());
    if (mobo == null) {
        return ResponseEntity.status(404).body("No se encontró una placa base compatible con la CPU seleccionada.");
    }
    // 4. Devolvemos la lista con ambos.
    List<Component> pcBuild = List.of(selectedCpu, mobo);
    return ResponseEntity.ok(pcBuild);
}
}