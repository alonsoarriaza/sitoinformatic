package com.shop.proyect.sitoinformatic.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.shop.proyect.sitoinformatic.model.Component;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

@Repository
public interface ComponentRepository extends JpaRepository<Component, Long> {
    
    Page<Component> findByCategoryIgnoreCase(String category, Pageable pageable);


    Page<Component> findByProductNameContainingIgnoreCase(String name, Pageable pageable);

    List<Component> findByCategoryAndStockGreaterThan(String category, int stock);
}