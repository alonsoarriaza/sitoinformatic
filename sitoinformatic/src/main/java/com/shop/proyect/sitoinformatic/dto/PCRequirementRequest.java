package com.shop.proyect.sitoinformatic.dto;

import java.math.BigDecimal;

public class PCRequirementRequest {
private BigDecimal budget;
private String mainUse;
private String priority;
private String format;

  public PCRequirementRequest() {
}
    public PCRequirementRequest(BigDecimal budget, String mainUse, String priority, String format) {
    this.budget = budget;
    this.mainUse = mainUse;
    this.priority = priority;
    this.format = format;
}
    public BigDecimal getBudget() {
        return budget;
    }
    public void setBudget(BigDecimal budget) {
        this.budget = budget;
    }
    public String getMainUse() {
        return mainUse;
    }
    public void setMainUse(String mainUse) {
        this.mainUse = mainUse;
    }
    public String getPriority() {
        return priority;
    }
    public void setPriority(String priority) {
        this.priority = priority;
    }
    public String getFormat() {
        return format;
    }
    public void setFormat(String format) {
        this.format = format;
    }
    
}
