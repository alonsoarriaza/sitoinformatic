package com.shop.proyect.sitoinformatic.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.http.HttpMethod;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.shop.proyect.sitoinformatic.repository.UserRepository;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableMethodSecurity
@EnableWebSecurity 
public class SecurityConfig {

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public UserDetailsService userDetailsService(UserRepository userRepository) {
        return username -> userRepository.findByEmail(username)
            .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));
    }
    
    @Bean
    public AuthenticationProvider authenticationProvider(UserDetailsService userDetailsService, BCryptPasswordEncoder passwordEncoder) {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder);
        return authProvider;
    }

    // Política de CORS para que el navegador no bloquee las peticiones de React
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        // Permitimos específicamente el puerto de nuestro frontend
        configuration.setAllowedOrigins(List.of("http://localhost:5173"));
        // Métodos permitidos para las peticiones HTTP
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        // Cabeceras permitidas (necesarias para enviar JSON y tokens)
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type", "Cache-Control"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

@Bean
public SecurityFilterChain securityFilterChain(
        HttpSecurity http, 
        JwtAuthenticationFilter jwtAuthFilter, 
        AuthenticationProvider authenticationProvider) throws Exception {

    http
        .cors(cors -> cors.configurationSource(corsConfigurationSource()))
        .csrf(csrf -> csrf.disable()) 
        .authorizeHttpRequests(auth -> auth
            // 1. Rutas de Autenticación (Login y Registro)
            .requestMatchers("/api/auth/**").permitAll() 
            .requestMatchers("/auth/**").permitAll()

            // 2. Rutas del Asistente y Componentes (Aseguramos ambos prefijos)
            .requestMatchers("/api/assistant/**").permitAll()
            .requestMatchers("/api/components/**").permitAll()
            .requestMatchers(HttpMethod.GET, "/components/**").permitAll()

            // 3. Cualquier otra petición requiere TOKEN
            .anyRequest().authenticated() 
        )
        .sessionManagement(session -> session
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS) 
        )
        .authenticationProvider(authenticationProvider) 
        .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);         

    return http.build();
}
}