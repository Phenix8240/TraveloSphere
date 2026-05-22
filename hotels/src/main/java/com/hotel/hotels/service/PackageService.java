package com.hotel.hotels.service;

import com.hotel.hotels.dto.*;
import com.hotel.hotels.entity.*;
import com.hotel.hotels.entity.Package;
import com.hotel.hotels.exception.*;
import com.hotel.hotels.repo.HotelRepository;
import com.hotel.hotels.repo.TourServiceRepository;
import com.hotel.hotels.repository.PackageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class PackageService {

    @Autowired
    private PackageRepository packageRepository;
    @Autowired
    private HotelRepository hotelRepository;
    @Autowired
    private TourServiceRepository tourServiceRepository;

    @Transactional
    public PackageDTO createPackage(PackageDTO packageDTO) {
        Package pkg = new Package();
        pkg.setName(packageDTO.getName());
        pkg.setDescription(packageDTO.getDescription());
        pkg.setPrice(packageDTO.getPrice());
        pkg.setDurationDays(packageDTO.getDurationDays());
        return mapToDTO(packageRepository.save(pkg));
    }

    public List<PackageDTO> getAllPackages() {
        return packageRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public PackageDTO getPackageById(Long id) {
        return mapToDTO(packageRepository.findById(id)
                .orElseThrow(() -> new PackageNotFoundException("Package not found with id: " + id)));
    }

    @Transactional
    public PackageDTO updatePackage(Long id, PackageDTO packageDTO) {
        Package pkg = packageRepository.findById(id)
                .orElseThrow(() -> new PackageNotFoundException("Package not found with id: " + id));

        pkg.setName(packageDTO.getName());
        pkg.setDescription(packageDTO.getDescription());
        pkg.setPrice(packageDTO.getPrice());
        pkg.setDurationDays(packageDTO.getDurationDays());

        return mapToDTO(packageRepository.save(pkg));
    }

    @Transactional
    public void deletePackage(Long id) {
        Package pkg = packageRepository.findById(id)
                .orElseThrow(() -> new PackageNotFoundException("Package not found with id: " + id));

        // Clear relationships
        clearPackageRelationships(pkg);
        packageRepository.delete(pkg);
    }

    @Transactional
    public PackageDTO assignHotelsToPackage(Long packageId, List<Long> hotelIds) {
        Package pkg = getPackageOrThrow(packageId);
        List<Hotel> hotels = getHotelsOrThrow(hotelIds);

        updateHotelRelationships(pkg, hotels);
        return mapToDTO(packageRepository.save(pkg));
    }

    @Transactional
    public PackageDTO assignTourServicesToPackage(Long packageId, List<Long> tourServiceIds) {
        Package pkg = getPackageOrThrow(packageId);
        List<TourService> tourServices = getTourServicesOrThrow(tourServiceIds);

        updateTourServiceRelationships(pkg, tourServices);
        return mapToDTO(packageRepository.save(pkg));
    }

    public List<PackageTourServiceDTO> getAvailableTourServices(Long packageId, String category) {
        Package pkg = getPackageOrThrow(packageId);
        List<TourService> availableServices = getAvailableServicesByCategory(category);

        return availableServices.stream()
                .filter(service -> !pkg.getTourServices().contains(service))
                .map(this::mapTourServiceToDTO)
                .collect(Collectors.toList());
    }

    // Helper methods
    private Package getPackageOrThrow(Long packageId) {
        return packageRepository.findById(packageId)
                .orElseThrow(() -> new PackageNotFoundException("Package not found with id: " + packageId));
    }

    private List<Hotel> getHotelsOrThrow(List<Long> hotelIds) {
        List<Hotel> hotels = hotelRepository.findAllById(hotelIds);
        if (hotels.size() != hotelIds.size()) {
            throw new ResourceNotFoundException("One or more hotels not found");
        }
        return hotels;
    }

    private List<TourService> getTourServicesOrThrow(List<Long> tourServiceIds) {
        List<TourService> tourServices = tourServiceRepository.findAllById(tourServiceIds);
        if (tourServices.size() != tourServiceIds.size()) {
            List<Long> missingIds = findMissingServiceIds(tourServiceIds, tourServices);
            throw new ResourceNotFoundException("Missing tour services: " + missingIds);
        }
        return tourServices;
    }

    private List<Long> findMissingServiceIds(List<Long> requestedIds, List<TourService> foundServices) {
        Set<Long> foundIds = foundServices.stream()
                .map(TourService::getId)
                .collect(Collectors.toSet());
        return requestedIds.stream()
                .filter(id -> !foundIds.contains(id))
                .collect(Collectors.toList());
    }

    private List<TourService> getAvailableServicesByCategory(String category) {
        return category != null ?
                tourServiceRepository.findByCategoryAndActiveTrue(category) :
                tourServiceRepository.findByActiveTrue();
    }

    private void clearPackageRelationships(Package pkg) {
        pkg.getHotels().forEach(h -> h.getPackages().remove(pkg));
        pkg.getTourServices().forEach(ts -> ts.getPackages().remove(pkg));
    }

    private void updateHotelRelationships(Package pkg, List<Hotel> hotels) {
        pkg.getHotels().forEach(h -> h.getPackages().remove(pkg));
        pkg.getHotels().clear();
        hotels.forEach(h -> pkg.addHotel(h));
    }

    private void updateTourServiceRelationships(Package pkg, List<TourService> tourServices) {
        pkg.getTourServices().forEach(ts -> ts.getPackages().remove(pkg));
        pkg.getTourServices().clear();
        tourServices.forEach(ts -> pkg.addTourService(ts));
    }

    // Mapping methods
    private PackageDTO mapToDTO(Package pkg) {
        if (pkg == null) return null;

        PackageDTO dto = new PackageDTO();
        dto.setId(pkg.getId());
        dto.setName(pkg.getName());
        dto.setDescription(pkg.getDescription());
        dto.setPrice(pkg.getPrice());
        dto.setDurationDays(pkg.getDurationDays());
        dto.setHotels(mapHotelsToDTO(pkg.getHotels()));
        dto.setTourServices(mapTourServicesToDTO(pkg.getTourServices()));
        return dto;
    }

    private List<PackageHotelDTO> mapHotelsToDTO(List<Hotel> hotels) {
        return hotels == null ? Collections.emptyList() :
                hotels.stream()
                        .map(this::mapHotelToDTO)
                        .collect(Collectors.toList());
    }

    private List<PackageTourServiceDTO> mapTourServicesToDTO(List<TourService> tourServices) {
        return tourServices == null ? Collections.emptyList() :
                tourServices.stream()
                        .map(this::mapTourServiceToDTO)
                        .collect(Collectors.toList());
    }

    private PackageHotelDTO mapHotelToDTO(Hotel hotel) {
        if (hotel == null) return null;
        PackageHotelDTO dto = new PackageHotelDTO();
        dto.setId(hotel.getId());
        dto.setName(hotel.getName());
        dto.setLocation(hotel.getLocation());
        dto.setRating(hotel.getRating());
        return dto;
    }

    private PackageTourServiceDTO mapTourServiceToDTO(TourService tourService) {
        if (tourService == null) return null;
        PackageTourServiceDTO dto = new PackageTourServiceDTO();
        dto.setId(tourService.getId());
        dto.setName(tourService.getName());
        dto.setDescription(tourService.getDescription());
        dto.setPrice(tourService.getPrice());
        dto.setDuration(tourService.getDuration());
        dto.setCategory(tourService.getCategory());
        return dto;
    }
}