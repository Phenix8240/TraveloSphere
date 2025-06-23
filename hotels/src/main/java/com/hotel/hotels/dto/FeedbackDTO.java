package com.hotel.hotels.dto;

import java.time.LocalDateTime;

public class FeedbackDTO {
    private Long id;
    private String comment;
    private Integer rating;
    private LocalDateTime createdAt;
    private Long customerId;
    private String customerName;

    // Constructors
    public FeedbackDTO() {}

    public FeedbackDTO(Long id, String comment, Integer rating, LocalDateTime createdAt, Long customerId, String customerName) {
        this.id = id;
        this.comment = comment;
        this.rating = rating;
        this.createdAt = createdAt;
        this.customerId = customerId;
        this.customerName = customerName;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }
}

