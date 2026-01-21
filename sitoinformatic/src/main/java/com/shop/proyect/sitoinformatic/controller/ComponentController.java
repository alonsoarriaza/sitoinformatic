package com.shop.proyect.sitoinformatic.controller;

import com.shop.proyect.sitoinformatic.model.Component;
import com.shop.proyect.sitoinformatic.repository.ComponentRepository;
import com.shop.proyect.sitoinformatic.service.ComponentService;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;

@RestController
@RequestMapping("/components")
public class ComponentController {

    private final ComponentRepository componentRepository;
    private final ComponentService componentService;

    public ComponentController(ComponentRepository componentRepository, ComponentService componentService) {
        this.componentRepository = componentRepository;
        this.componentService = componentService;
    }

    
    @GetMapping
   public ResponseEntity<Page<Component>> getAll(
    @PageableDefault(page = 0, size = 10) Pageable pageable) {
        return ResponseEntity.ok(componentService.getAllComponents(pageable));
}

    
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Component> create(@Valid @RequestBody Component component) {
        Component saved = componentRepository.save(component);
        return ResponseEntity.ok(saved);
    }
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void>delete(@PathVariable Long id){

        componentRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }  
@PutMapping("/{id}")
@PreAuthorize("hasRole('ADMIN')")
public ResponseEntity<Component> update(@PathVariable Long id,@Valid @RequestBody Component componentDetails) {
    return componentRepository.findById(id)
            .map(component -> {
                component.setProductName(componentDetails.getProductName());
                component.setCategory(componentDetails.getCategory());
                component.setBrand(componentDetails.getBrand());
                component.setPrice(componentDetails.getPrice());
                component.setStock(componentDetails.getStock());
                Component updated = componentRepository.save(component);
                return ResponseEntity.ok(updated);
            })
            .orElse(ResponseEntity.notFound().build());
}
}