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

            // USAMOS ESTO ANTES PARA HACER PRUEBAS CON POSTMAN PERO AHORA HACEMOS LA IMPORTACION DE COMPONENTES DESDE IMPRT.SQL
//         } if (componentRepository.count() == 0) {
//             com.shop.proyect.sitoinformatic.model.Component gpu = new com.shop.proyect.sitoinformatic.model.Component();
//              com.shop.proyect.sitoinformatic.model.Component cpu = new com.shop.proyect.sitoinformatic.model.Component();
//               com.shop.proyect.sitoinformatic.model.Component ram = new com.shop.proyect.sitoinformatic.model.Component();

//             gpu.setProductName("Tarjeta Gráfica Gigabyte GeForce RTX 5080 WINDFORCE OC SFF 16GB GDDR7");
//             gpu.setCategory("Tarjeta Gráfica");
//             gpu.setBrand("Gigabyte");
//             gpu.setPrice(new java.math.BigDecimal("1069.00"));
//             gpu.setStock(10);

//             cpu.setProductName("Procesador AMD Ryzen 7 9800X3D 4.7/5.2GHz");
//             cpu.setCategory("Procesador");
//             cpu.setBrand("AMD");
//             cpu.setPrice(new java.math.BigDecimal("501.91"));
//             cpu.setStock(20);

//             ram.setProductName("Memoria RAM Forgeon Cyclone PLUS V2 DDR4 3200 MHz 32GB 2x16GB CL16");
//             ram.setCategory("Ram");
//             ram.setBrand("Forgeon");
//             ram.setPrice(new java.math.BigDecimal("196.95"));
//             ram.setStock(100);
        
//             componentRepository.save(gpu);
//             componentRepository.save(cpu);
//             componentRepository.save(ram);

//             System.out.println("--------------------------------------------------");
//             System.out.println("COMPONENTE DE PRUEBA CREADO: RTX 5080"); 
//             System.out.println("COMPONENTE DE PRUEBA CREADO:AMD RYZEN 7 9800X3D");
//             System.out.println("COMPONENTE DE PRUEBA CREADO: RAM FORGEON DDR4");
//             System.out.println("--------------------------------------------------");
//             } else {
//             System.out.println("La base de datos ya contiene componentes.");
           

         }
 }
}
