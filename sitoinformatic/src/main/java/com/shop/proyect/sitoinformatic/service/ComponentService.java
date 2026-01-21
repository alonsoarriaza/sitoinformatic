package com.shop.proyect.sitoinformatic.service;


import org.springframework.stereotype.Service;
import com.shop.proyect.sitoinformatic.model.Component;
import com.shop.proyect.sitoinformatic.repository.ComponentRepository;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Service
public class ComponentService {

    private final ComponentRepository componentRepository;

    
    public ComponentService(ComponentRepository componentRepository) {
        this.componentRepository = componentRepository;
    }

    @SuppressWarnings("unused")
    public Component saveComponent(@NotNull Component component) {
    Component saved = componentRepository.save(component);
    if (saved == null) {
        throw new RuntimeException("Error al guardar el componente");
    }
    return saved;
}
    public Page<Component> getAllComponents(Pageable pageable) {
        return componentRepository.findAll(pageable);
    }
    public Component getComponentById(Long id) {
        return componentRepository.findById(id)
                .orElse(null);
    }
    public void deleteComponent(Long id) {
        componentRepository.deleteById(id);
    }

    public Component updateComponent(Long id, Component componentDetails) {
    return componentRepository.findById(id)
        .map(componentExist -> {
          
            componentExist.setProductName(componentDetails.getProductName());
            componentExist.setPrice(componentDetails.getPrice());
            componentExist.setCategory(componentDetails.getCategory());
            componentExist.setBrand(componentDetails.getBrand());
            componentExist.setStock(componentDetails.getStock());

            return componentRepository.save(componentExist); 
        }) 
        .orElseThrow(() -> new RuntimeException("Componente no encontrado con id: " + id));
}
}
