package com.hotel.hotels.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
public class Package {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private double price;
    private int durationDays; // Added duration in days

    @JsonManagedReference
    @ManyToMany
    @JoinTable(
            name = "hotel_package",
            joinColumns = @JoinColumn(name = "package_id"),
            inverseJoinColumns = @JoinColumn(name = "hotel_id")
    )
    private List<Hotel> hotels = new ArrayList<>();

    // In Package.java entity
    @JsonManagedReference
    @ManyToMany
    @JoinTable(
            name = "package_tour_services",
            joinColumns = @JoinColumn(name = "package_id"),
            inverseJoinColumns = @JoinColumn(name = "tour_service_id")
    )
    private List<TourService> tourServices = new ArrayList<>();

    // Helper methods to add/remove tour services
    public void addTourService(TourService tourService) {
        this.tourServices.add(tourService);
        tourService.getPackages().add(this);
    }

    public void removeTourService(TourService tourService) {
        this.tourServices.remove(tourService);
        tourService.getPackages().remove(this);
    }

    public List<TourService> getTourServices() {
        return tourServices;
    }

    public void setTourServices(List<TourService> tourServices) {
        this.tourServices = tourServices;
    }

    // Don't forget to add getters and setters
    // Helper method to add hotel
    public void addHotel(Hotel hotel) {
        this.hotels.add(hotel);
        hotel.getPackages().add(this);
    }

    // Helper method to remove hotel
    public void removeHotel(Hotel hotel) {
        this.hotels.remove(hotel);
        hotel.getPackages().remove(this);
    }

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

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getDurationDays() {
        return durationDays;
    }

    public void setDurationDays(int durationDays) {
        this.durationDays = durationDays;
    }

    public List<Hotel> getHotels() {
        return hotels;
    }

    public void setHotels(List<Hotel> hotels) {
        this.hotels = hotels;
    }
}