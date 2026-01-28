package com.shop.proyect.sitoinformatic.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shop.proyect.sitoinformatic.dto.PCRequirementRequest;
import com.shop.proyect.sitoinformatic.service.AssistantService;
import com.shop.proyect.sitoinformatic.model.Component;

import java.util.ArrayList;
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
    
    // 1. Validación 
    String validationMessage = assistantService.validateRequirements(request);
    if (!validationMessage.equals("OK")) return ResponseEntity.badRequest().body(validationMessage);

    // 2. Selección de CPU
    Component selectedCpu = assistantService.selectCpu(request.getBudget());
    if (selectedCpu == null) return ResponseEntity.status(404).body("No hay CPU para este presupuesto");

    // 3. Selección de Placa Base (Mobo)
    Component mobo = assistantService.selectMotherboard(selectedCpu.getCompatibilityTag(), request.getBudget());
    if (mobo == null) return ResponseEntity.status(404).body("No hay placa compatible");

    // 4. NUEVO: Selección de Tarjeta Gráfica (GPU)
    Component gpu = assistantService.selectGpu(request.getBudget());
    // (Nota: No ponemos error 404 aquí por si el usuario quiere usar la gráfica integrada de la CPU)
    Component ram = assistantService.selectRam(request.getBudget());
    Component ssd = assistantService.selectStorage(request.getBudget());
    Component psu = assistantService.selectPsu(request.getBudget());
    Component pcCase = assistantService.selectCase(request.getBudget());
//Añadimos todos los componentes a una lista.
    List<Component> pcBuild = new ArrayList<>();
    pcBuild.add(selectedCpu);
    pcBuild.add(mobo);
    if (gpu != null) pcBuild.add(gpu);
    if (ram != null) pcBuild.add(ram);
    if (ssd != null) pcBuild.add(ssd);
    if (psu != null) pcBuild.add(psu);
    if (pcCase != null) pcBuild.add(pcCase);
    
    return ResponseEntity.ok(pcBuild);
}
}
