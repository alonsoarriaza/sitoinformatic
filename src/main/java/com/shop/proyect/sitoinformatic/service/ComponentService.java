package com.shop.proyect.sitoinformatic.service;

import com.shop.proyect.sitoinformatic.model.Component;
import com.shop.proyect.sitoinformatic.repository.ComponentRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ComponentService {

    private final ComponentRepository componentRepository;

    public ComponentService(ComponentRepository componentRepository) {
        this.componentRepository = componentRepository;
    }

    public List<Component> getAllComponents() {
        return componentRepository.findAll();
    }

    public Optional<Component> getComponentById(Long id) {
        return componentRepository.findById(id);
    }

    public List<Component> getByBrand(String brand) {
        return componentRepository.findAll().stream()
                .filter(c -> c.getBrand() != null && c.getBrand().equalsIgnoreCase(brand))
                .collect(Collectors.toList());
    }

    public void updateStock(Long id, Integer newStock) {
        componentRepository.findById(id).ifPresent(c -> {
            c.setStock(newStock);
            componentRepository.save(c);
        });
    }
    public void imprimirNombre(Component c) {
        System.out.println(c.getProductName()); 
    }
}