package com.hotel.hotels.repo;

import com.hotel.hotels.entity.CustomExperience;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomExperienceRepository extends JpaRepository<CustomExperience, Long> {

    // Find all custom experiences for a specific customer
    List<CustomExperience> findByCustomerId(Long customerId);

    // Check if an experience exists and belongs to a specific customer
    boolean existsByIdAndCustomerId(Long experienceId, Long customerId);

    // Find by name containing (for search functionality)
    List<CustomExperience> findByNameContainingIgnoreCase(String name);

    // Find by customer and name (exact match)
    List<CustomExperience> findByCustomerIdAndName(Long customerId, String name);
}