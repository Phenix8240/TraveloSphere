package com.hotel.hotels.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class CustomExperience {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private double totalPrice;
    private int totalDurationDays;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @ManyToMany
    @JoinTable(
            name = "experience_tour_services",
            joinColumns = @JoinColumn(name = "experience_id"),
            inverseJoinColumns = @JoinColumn(name = "tour_service_id")
    )
    private List<TourService> tourServices = new ArrayList<>();

    // Helper methods
    public void addTourService(TourService service) {
        this.tourServices.add(service);
        this.totalPrice += service.getPrice();
        this.totalDurationDays += calculateDurationDays(service.getDuration());
    }

    public void removeTourService(TourService service) {
        this.tourServices.remove(service);
        this.totalPrice -= service.getPrice();
        this.totalDurationDays -= calculateDurationDays(service.getDuration());
    }

    private int calculateDurationDays(String duration) {
        // Implementation to convert duration string to days
        if (duration.contains("day")) {
            return Integer.parseInt(duration.split(" ")[0]);
        }
        return 1; // Default to 1 day for hourly services
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

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public List<TourService> getTourServices() {
        return tourServices;
    }

    public void setTourServices(List<TourService> tourServices) {
        this.tourServices = tourServices;
    }
}