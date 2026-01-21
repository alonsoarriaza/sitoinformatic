package com.shop.proyect.sitoinformatic.service;

import java.util.Optional;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService; 
import org.springframework.security.core.userdetails.UsernameNotFoundException; 
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.shop.proyect.sitoinformatic.repository.UserRepository;
import com.shop.proyect.sitoinformatic.model.User;

@Service

public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }
    
 
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        
        return userRepository.findByEmail(email)
            
            .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado: " + email));
            
    }


    public String encodePassword(String rawPassword) {
        return passwordEncoder.encode(rawPassword);
    }
    public Optional<User> findUserById(Long id) {
        if (id == null) {
            return Optional.empty();
        }
        return userRepository.findById(id); 
    }

    private static final String ROL_USER = "USER";
    public User registerUser(User user) {

        if(userRepository.existsByEmail(user.getEmail())){
            throw new RuntimeException("El email " + user.getEmail() + " ya está registrado.");

        }
        String rawPassword = user.getPassword();
        String encodedPasword = passwordEncoder.encode(rawPassword);

        user.setPassword(encodedPasword);
        user.setRol(ROL_USER);

        return userRepository.save(user);

    }

    public User loginUser(String email,String password){

        Optional<User> userOptional = userRepository.findByEmail(email);

        if(userOptional.isEmpty()){

            throw new RuntimeException("Credenciales inválidas");
        }
        User user = userOptional.get();

        if(passwordEncoder.matches(password, user.getPassword())){

            return user;
            
        }else {

            throw new RuntimeException("Credenciales Inválidas");
        }

    }

}








