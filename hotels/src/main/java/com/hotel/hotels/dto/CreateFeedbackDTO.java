package com.hotel.hotels.dto;

public class CreateFeedbackDTO {
    private String comment;
    private Integer rating;
    private Long customerId;

    // Constructors
    public CreateFeedbackDTO() {}

    public CreateFeedbackDTO(String comment, Integer rating, Long customerId) {
        this.comment = comment;
        this.rating = rating;
        this.customerId = customerId;
    }

    // Getters and Setters
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

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }
}