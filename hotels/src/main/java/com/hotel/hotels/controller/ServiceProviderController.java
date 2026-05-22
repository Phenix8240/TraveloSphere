package com.hotel.hotels.controller;

import com.hotel.hotels.entity.ServiceProvider;
import com.hotel.hotels.entity.TourService;
import com.hotel.hotels.service.ServiceProviderService;
import com.hotel.hotels.service.TourServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/providers")
public class ServiceProviderController {

    @Autowired
    private ServiceProviderService providerService;

    @Autowired
    private TourServiceService tourServiceService;

    /* ========== Service Provider CRUD ========== */

    @PostMapping
    public ResponseEntity<ServiceProvider> createProvider(@RequestBody ServiceProvider provider) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(providerService.createProvider(provider));
    }

    @GetMapping
    public ResponseEntity<List<ServiceProvider>> getAllProviders() {
        return ResponseEntity.ok(providerService.getAllActiveProviders());
    }

    @GetMapping("/{providerId}")
    public ResponseEntity<ServiceProvider> getProvider(@PathVariable Long providerId) {
        return ResponseEntity.ok(providerService.getProviderById(providerId));
    }

    @PutMapping("/{providerId}")
    public ResponseEntity<ServiceProvider> updateProvider(
            @PathVariable Long providerId,
            @RequestBody ServiceProvider providerDetails) {
        return ResponseEntity.ok(providerService.updateProvider(providerId, providerDetails));
    }

    @DeleteMapping("/{providerId}")
    public ResponseEntity<Void> deleteProvider(@PathVariable Long providerId) {
        providerService.deactivateProvider(providerId);
        return ResponseEntity.noContent().build();
    }

    /* ========== Tour Service CRUD ========== */

    @PostMapping("/{providerId}/services")
    public ResponseEntity<TourService> createService(
            @PathVariable Long providerId,
            @RequestBody TourService service) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(tourServiceService.createServiceForProvider(providerId, service));
    }

    @GetMapping("/{providerId}/services")
    public ResponseEntity<List<TourService>> getServicesByProvider(
            @PathVariable Long providerId) {
        return ResponseEntity.ok(tourServiceService.getServicesByProvider(providerId));
    }

    @GetMapping("/{providerId}/services/{serviceId}")
    public ResponseEntity<TourService> getServiceById(
            @PathVariable Long providerId,
            @PathVariable Long serviceId) {
        return ResponseEntity.ok(tourServiceService.getServiceById(serviceId));
    }

    @PutMapping("/{providerId}/services/{serviceId}")
    public ResponseEntity<TourService> updateService(
            @PathVariable Long providerId,
            @PathVariable Long serviceId,
            @RequestBody TourService serviceDetails) {
        return ResponseEntity.ok(tourServiceService.updateService(serviceId, serviceDetails));
    }

    @DeleteMapping("/{providerId}/services/{serviceId}")
    public ResponseEntity<Void> deleteService(
            @PathVariable Long providerId,
            @PathVariable Long serviceId) {
        tourServiceService.deactivateService(serviceId);
        return ResponseEntity.noContent().build();
    }
}