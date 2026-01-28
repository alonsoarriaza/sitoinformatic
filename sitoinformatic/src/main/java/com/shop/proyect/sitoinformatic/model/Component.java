package com.shop.proyect.sitoinformatic.model;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.DecimalMin;

@Entity
@Table(name= "components")
public class Component {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)

@Column(name = "id")
private Long id;

@Column(name = "productName")
@NotBlank(message = "El nombre no puede estar vacío")
private String productName;

@Column(name = "category")
@NotBlank(message = "La categoría no puede estar vacía")
private String category;

@Column(name = "brand")
@NotBlank(message = "La marca no puede estar vacía")
private String brand;

@Column(name = "price")
@DecimalMin(value = "0.01", message = "El precio debe ser mayor a cero")
private BigDecimal price;

@Column(name = "stock")
@Min(value = 0, message = "El stock no puede ser negativo")
private int stock;

@Column(name = "performance_level")
private String performanceLevel;

@Column (name = "compatibility_tag")
private String compatibilityTag;




public Component(String productName, String category, String brand, BigDecimal price, int stock, String performanceLevel, String compatibilityTag) {
    this.productName = productName;
    this.category = category;
    this.brand = brand;
    this.price = price;
    this.stock = stock;
    this.performanceLevel = performanceLevel;
    this.compatibilityTag = compatibilityTag;
    
}
public Component() {
}
public Long getId() {
    return id;
}
public void setId(Long id) {
    this.id = id;
}
public String getProductName() {
    return productName;
}
public void setProductName(String productName) {
    this.productName = productName;
}
public String getCategory() {
    return category;
}
public void setCategory(String category) {
    this.category = category;
}
public String getBrand() {
    return brand;
}
public void setBrand(String brand) {
    this.brand = brand;
}
public BigDecimal getPrice() {
    return price;
}
public void setPrice(BigDecimal price) {
    this.price = price;
}
public int getStock() {
    return stock;
}
public void setStock(int stock) {
    this.stock = stock;
}
public String getPerformanceLevel() {
    return performanceLevel;
}
public void setPerformanceLevel(String performanceLevel) {
    this.performanceLevel = performanceLevel;
}
public String getCompatibilityTag() {
    return compatibilityTag;
}
public void setCompatibilityTag(String compatibilityTag) {
    this.compatibilityTag = compatibilityTag;
}
}
