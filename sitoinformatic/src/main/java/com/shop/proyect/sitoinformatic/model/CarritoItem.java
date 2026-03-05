package com.shop.proyect.sitoinformatic.model;

import jakarta.persistence.*;

@Entity
@Table(name = "carrito")
public class CarritoItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private User user; 

    @ManyToOne
    @JoinColumn(name = "component_id", nullable = false)
    private Component component;

    private int quantity;

    // Constructor vacío obligatorio para JPA
    public CarritoItem() {}

    // Constructor con parámetros
    public CarritoItem(User user, Component component, int quantity) {
        this.user = user;
        this.component = component;
        this.quantity = quantity;
    }

    // --- GETTERS Y SETTERS (Indispensables para que el código funcione) ---

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Component getComponent() {
        return component;
    }

    public void setComponent(Component component) {
        this.component = component;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}