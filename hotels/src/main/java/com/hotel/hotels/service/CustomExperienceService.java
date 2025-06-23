package com.hotel.hotels.service;

import com.hotel.hotels.dto.*;
import com.hotel.hotels.entity.*;
import com.hotel.hotels.exception.*;
import com.hotel.hotels.repo.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CustomExperienceService {

    @Autowired
    private CustomExperienceRepository experienceRepository;

    @Autowired
    private TourServiceRepository tourServiceRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Transactional
    public CustomExperienceDTO createExperience(Long customerId, CustomExperienceRequest request) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));

        CustomExperience experience = new CustomExperience();
        experience.setName(request.getName());
        experience.setDescription(request.getDescription());
        experience.setTotalPrice(0);
        experience.setTotalDurationDays(0);

        List<TourService> services = tourServiceRepository.findAllById(request.getServiceIds());
        if (services.size() != request.getServiceIds().size()) {
            throw new ResourceNotFoundException("Some services not found");
        }

        services.forEach(experience::addTourService);
        customer.addCustomExperience(experience);

        CustomExperience saved = experienceRepository.save(experience);
        return mapToDTO(saved);
    }

    public List<CustomExperienceDTO> getCustomerExperiences(Long customerId) {
        return experienceRepository.findByCustomerId(customerId).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public CustomExperienceDTO updateExperience(Long customerId, Long experienceId, CustomExperienceRequest request) {
        CustomExperience experience = experienceRepository.findById(experienceId)
                .orElseThrow(() -> new ResourceNotFoundException("Experience not found"));

        if (!experience.getCustomer().getId().equals(customerId)) {
            throw new ResourceNotFoundException("You don't own this experience");
        }

        experience.setName(request.getName());
        experience.setDescription(request.getDescription());

        // Update services
        experience.getTourServices().clear();
        experience.setTotalPrice(0);
        experience.setTotalDurationDays(0);

        List<TourService> services = tourServiceRepository.findAllById(request.getServiceIds());
        if (services.size() != request.getServiceIds().size()) {
            throw new ResourceNotFoundException("Some services not found");
        }

        services.forEach(experience::addTourService);
        CustomExperience updated = experienceRepository.save(experience);
        return mapToDTO(updated);
    }

    @Transactional
    public void deleteExperience(Long customerId, Long experienceId) {
        CustomExperience experience = experienceRepository.findById(experienceId)
                .orElseThrow(() -> new ResourceNotFoundException("Experience not found"));

        if (!experience.getCustomer().getId().equals(customerId)) {
            throw new ResourceNotFoundException("You don't own this experience");
        }

        experience.getCustomer().removeCustomExperience(experience);
        experienceRepository.delete(experience);
    }

    private CustomExperienceDTO mapToDTO(CustomExperience experience) {
        CustomExperienceDTO dto = new CustomExperienceDTO();
        dto.setId(experience.getId());
        dto.setName(experience.getName());
        dto.setDescription(experience.getDescription());
        dto.setTotalPrice(experience.getTotalPrice());
        dto.setTotalDurationDays(experience.getTotalDurationDays());
        dto.setCustomerId(experience.getCustomer().getId());

        dto.setServices(experience.getTourServices().stream()
                .map(this::mapServiceToDTO)
                .collect(Collectors.toList()));

        return dto;
    }

    private PackageTourServiceDTO mapServiceToDTO(TourService service) {
        PackageTourServiceDTO dto = new PackageTourServiceDTO();
        dto.setId(service.getId());
        dto.setName(service.getName());
        dto.setDescription(service.getDescription());
        dto.setPrice(service.getPrice());
        dto.setDuration(service.getDuration());
        dto.setCategory(service.getCategory());
        return dto;
    }
}