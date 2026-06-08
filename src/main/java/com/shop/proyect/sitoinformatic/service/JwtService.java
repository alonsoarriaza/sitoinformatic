package com.shop.proyect.sitoinformatic.service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.shop.proyect.sitoinformatic.model.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

    @Value("${JWT_SECRET:${jwt.secret:}}")
    private String secretKey;

    public JwtService() {
        // default constructor for Spring
    }

    // constructor for tests
    public JwtService(String secretKey) {
        this.secretKey = secretKey;
    }

    private Key getSigningKey() {
        byte[] keyBytes = secretKey.getBytes();
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateToken(User user){
        Map<String, Object> extraClaims = new HashMap<>();

        extraClaims.put("id", String.valueOf(user.getId()));
        extraClaims.put("rol", user.getRol());

        Date issuedAt = new Date(System.currentTimeMillis());
        // 24 horas de validez
        Date expiration = new Date(issuedAt.getTime() + 1000L * 60 * 60 * 24);

        String token = Jwts.builder()
                .setClaims(extraClaims)
                .setSubject(user.getEmail())
                .setIssuedAt(issuedAt)
                .setExpiration(expiration)
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
        return token;
    }

    private Claims extractAllClaims(String jwt) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(jwt)
                .getBody();
    }

    @jakarta.annotation.PostConstruct
    private void validateSecret() {
        if (secretKey == null || secretKey.isBlank()) {
            throw new IllegalStateException("JWT secret is not set. Define environment variable 'JWT_SECRET' or property 'jwt.secret'.");
        }
    }

    public String extractEmail(String jwt) {
        return extractAllClaims(jwt).getSubject();
    }

    private Date extractExpiration(String jwt) {
        return extractAllClaims(jwt).getExpiration();
    }

    private boolean isTokenExpired(String jwt) {
        Date exp = extractExpiration(jwt);
        return exp != null && exp.before(new Date());
    }

    public boolean isTokenValid(String jwt, UserDetails userDetails) {
        final String email = extractEmail(jwt);
        return email != null && email.equals(userDetails.getUsername()) && !isTokenExpired(jwt);
    }
}
