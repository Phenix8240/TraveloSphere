package com.hotel.hotels.controller;

import com.hotel.hotels.dto.*;
import com.hotel.hotels.service.CustomExperienceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customers/{customerId}/experiences")
public class CustomExperienceController {

    @Autowired
    private CustomExperienceService experienceService;

    @PostMapping
    public ResponseEntity<CustomExperienceDTO> createExperience(
            @PathVariable Long customerId,
            @RequestBody CustomExperienceRequest request) {
        CustomExperienceDTO created = experienceService.createExperience(customerId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping
    public ResponseEntity<List<CustomExperienceDTO>> getCustomerExperiences(
            @PathVariable Long customerId) {
        return ResponseEntity.ok(experienceService.getCustomerExperiences(customerId));
    }

    @PutMapping("/{experienceId}")
    public ResponseEntity<CustomExperienceDTO> updateExperience(
            @PathVariable Long customerId,
            @PathVariable Long experienceId,
            @RequestBody CustomExperienceRequest request) {
        return ResponseEntity.ok(
                experienceService.updateExperience(customerId, experienceId, request)
        );
    }

    @DeleteMapping("/{experienceId}")
    public ResponseEntity<Void> deleteExperience(
            @PathVariable Long customerId,
            @PathVariable Long experienceId) {
        experienceService.deleteExperience(customerId, experienceId);
        return ResponseEntity.noContent().build();
    }
}