package com.shop.proyect.sitoinformatic.repository;



import org.springframework.data.jpa.repository.JpaRepository;

import com.shop.proyect.sitoinformatic.model.User;
import java.util.Optional;


public interface UserRepository extends JpaRepository <User,Long> {
    
    Optional <User> findByEmail(String email);
    boolean existsByEmail(String email);
}
