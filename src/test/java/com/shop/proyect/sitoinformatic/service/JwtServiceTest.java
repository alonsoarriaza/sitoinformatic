package com.shop.proyect.sitoinformatic.service;

import static org.junit.jupiter.api.Assertions.*;

import java.util.Date;

import org.junit.jupiter.api.Test;

import com.shop.proyect.sitoinformatic.model.User;

class JwtServiceTest {

    @Test
    void generateAndValidateToken() {
        String secret = "testsecrettestsecrettestsecrettestsecret";
        JwtService jwtService = new JwtService(secret);

        User user = new User("Test","test@example.com","pwd", new Date(), "USER");
        String token = jwtService.generateToken(user);

        assertNotNull(token);
        String email = jwtService.extractEmail(token);
        assertEquals("test@example.com", email);
        assertTrue(jwtService.isTokenValid(token, user));
    }
}
