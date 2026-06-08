package com.shop.proyect.sitoinformatic.config;

import java.util.Date;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.shop.proyect.sitoinformatic.model.User;
import com.shop.proyect.sitoinformatic.repository.ComponentRepository;
import com.shop.proyect.sitoinformatic.repository.UserRepository;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    

    public DataInitializer(UserRepository userRepository, PasswordEncoder passwordEncoder, ComponentRepository componentRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        
    }

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            User admin = new User();
            admin.setName("Admin de la tienda");
            admin.setEmail("admin@tienda.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setBirthdate(new Date());
            admin.setRol("ROLE_ADMIN");
            userRepository.save(admin);

            User user = new User();
            user.setName("Usuario Cliente");
            user.setEmail("user@tienda.com");
            user.setPassword(passwordEncoder.encode("user123"));
            user.setBirthdate(new Date());
            user.setRol("ROLE_USER");
            userRepository.save(user);

            System.out.println("--------------------------------------------------");
            System.out.println("USUARIOS DE PRUEBA CREADOS EN LA BASE DE DATOS");
            System.out.println("Admin: admin@tienda.com / admin123");
            System.out.println("User: user@tienda.com / user123");
            System.out.println("--------------------------------------------------");
         }
 }
}
