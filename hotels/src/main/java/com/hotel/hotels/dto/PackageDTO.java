package com.hotel.hotels.dto;

import java.util.List;

public class PackageDTO {
    private Long id;
    private String name;
    private String description;
    private double price;
    private int durationDays;
    private List<PackageHotelDTO> hotels;
    private List<PackageTourServiceDTO> tourServices; // Add this field

    // Getters and setters for all fields
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }
    public int getDurationDays() { return durationDays; }
    public void setDurationDays(int durationDays) { this.durationDays = durationDays; }
    public List<PackageHotelDTO> getHotels() { return hotels; }
    public void setHotels(List<PackageHotelDTO> hotels) { this.hotels = hotels; }
    public List<PackageTourServiceDTO> getTourServices() { return tourServices; }
    public void setTourServices(List<PackageTourServiceDTO> tourServices) { this.tourServices = tourServices; }
}