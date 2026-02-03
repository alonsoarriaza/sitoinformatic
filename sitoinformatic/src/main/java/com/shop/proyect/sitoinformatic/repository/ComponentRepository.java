package com.shop.proyect.sitoinformatic.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.shop.proyect.sitoinformatic.model.Component;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


public interface ComponentRepository extends JpaRepository<Component, Long> {
    
    // Busca componentes por categoría ignorando mayúsculas/minúsculas
    Page<Component> findByCategoryIgnoreCase(String category, Pageable pageable);

    // Busca componentes cuyo nombre contenga el texto (para el buscador)
    Page<Component> findByProductNameContainingIgnoreCase(String name, Pageable pageable);

    List<Component> findByCategoryAndStockGreaterThan(String category, int i);
}