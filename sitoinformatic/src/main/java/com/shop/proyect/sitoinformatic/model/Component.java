package com.shop.proyect.sitoinformatic.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "components")
public class Component {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Usamos el estándar de Java (CamelCase) pero indicamos el nombre de la DB
    @Column(name = "product_name", nullable = false)
    private String productName;

    private String category;
    
    private String brand;

    @Column(precision = 10, scale = 2) 
    private BigDecimal price;

    private Integer stock;

    @Column(name = "performance_level")
    private String performanceLevel;

    @Column(name = "compatibility_tag")
    private String compatibilityTag;

    public Component() {}

  
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getProductName() { return productName; }
    public void setProductName(String productName) { this.productName = productName; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }
    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }
    public Integer getStock() { return stock; }
    public void setStock(Integer stock) { this.stock = stock; }
    public String getPerformanceLevel() { return performanceLevel; }
    public void setPerformanceLevel(String performanceLevel) { this.performanceLevel = performanceLevel; }
    public String getCompatibilityTag() { return compatibilityTag; }
    public void setCompatibilityTag(String compatibilityTag) { this.compatibilityTag = compatibilityTag; }
}