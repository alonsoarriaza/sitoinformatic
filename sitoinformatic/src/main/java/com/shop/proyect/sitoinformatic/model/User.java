package com.shop.proyect.sitoinformatic.model;

import java.util.Collection;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails; 

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table (name = "users")

public class User implements UserDetails { 
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @Column (unique= true)
    private String email;
    @JsonIgnore 
    private String password;
    private Date birthdate;
    private String rol;

    public User() {
    }
    public User(String name, String email, String password, Date birthdate, String rol) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.birthdate = birthdate;
        this.rol = rol;
    }
    public Long getId() {
        return id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public Date getBirthdate() {
        return birthdate;
    }
    public void setBirthdate(Date birthdate) {
        this.birthdate = birthdate;
    }
    public String getRol() {
        return rol;
    }
    public void setRol(String rol) {
        this.rol = rol;
    }



    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
     
        return List.of(new SimpleGrantedAuthority(rol));
    }

    @Override
    public String getUsername() {

        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
      
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
  
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
      
        return true;
    }

    @Override
    public boolean isEnabled() {
      
        return true;
    }
}