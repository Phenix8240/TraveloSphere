package com.hotel.hotels.dto;

import java.util.List;

public class AssignTourServicesRequest {
    private List<Long> tourServiceIds;

    // Getters and setters
    public List<Long> getTourServiceIds() {
        return tourServiceIds;
    }

    public void setTourServiceIds(List<Long> tourServiceIds) {
        this.tourServiceIds = tourServiceIds;
    }

}