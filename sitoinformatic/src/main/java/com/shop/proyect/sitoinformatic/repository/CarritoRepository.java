package com.shop.proyect.sitoinformatic.repository;

import com.shop.proyect.sitoinformatic.model.CarritoItem;
import com.shop.proyect.sitoinformatic.model.User;
import com.shop.proyect.sitoinformatic.model.Component;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CarritoRepository extends JpaRepository<CarritoItem, Long> {

    // Recuperamos la lista de artículos que pertenecen a un usuario concreto
    List<CarritoItem> findByUser(User user);
    
    // Localizamos un artículo específico en el carrito de un usuario
    CarritoItem findByUserAndComponent(User user, Component component);
}