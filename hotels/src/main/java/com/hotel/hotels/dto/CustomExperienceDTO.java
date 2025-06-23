package com.hotel.hotels.dto;

import java.util.List;

public class CustomExperienceDTO {
    private Long id;
    private String name;
    private String description;
    private double totalPrice;
    private int totalDurationDays;
    private Long customerId;
    private List<PackageTourServiceDTO> services;

    // Getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public int getTotalDurationDays() {
        return totalDurationDays;
    }

    public void setTotalDurationDays(int totalDurationDays) {
        this.totalDurationDays = totalDurationDays;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public List<PackageTourServiceDTO> getServices() {
        return services;
    }

    public void setServices(List<PackageTourServiceDTO> services) {
        this.services = services;
    }
}