package com.shop.proyect.sitoinformatic.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shop.proyect.sitoinformatic.dto.PCRequirementRequest;
import com.shop.proyect.sitoinformatic.service.AssistantService;

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
  
    String validationMessage = assistantService.validateRequirements(request);
    
   
    if (!validationMessage.equals("OK")) {
       
        return ResponseEntity.badRequest().body(validationMessage);
    }

    
    System.out.println("Validación superada para: " + request.getBudget());
    return ResponseEntity.ok(request);
}
}
