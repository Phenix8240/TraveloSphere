package com.hotel.hotels.controller;

import com.hotel.hotels.dto.*;
import com.hotel.hotels.exception.HotelNotFoundException;
import com.hotel.hotels.service.PackageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/packages")
public class PackageController {

    @Autowired
    private PackageService packageService;

    @PostMapping
    public ResponseEntity<PackageDTO> createPackage(@RequestBody PackageDTO packageDTO) {
        PackageDTO createdPackage = packageService.createPackage(packageDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdPackage);
    }

    @GetMapping
    public ResponseEntity<List<PackageDTO>> getAllPackages() {
        List<PackageDTO> packages = packageService.getAllPackages();
        return ResponseEntity.ok(packages);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PackageDTO> getPackageById(@PathVariable Long id) {
        PackageDTO pkg = packageService.getPackageById(id);
        return ResponseEntity.ok(pkg);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PackageDTO> updatePackage(
            @PathVariable Long id,
            @RequestBody PackageDTO packageDTO) {
        PackageDTO updatedPackage = packageService.updatePackage(id, packageDTO);
        return ResponseEntity.ok(updatedPackage);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePackage(@PathVariable Long id) {
        packageService.deletePackage(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{packageId}/hotels")
    public ResponseEntity<PackageDTO> assignHotelsToPackage(
            @PathVariable Long packageId,
            @RequestBody List<Long> hotelIds) throws HotelNotFoundException {
        PackageDTO updatedPackage = packageService.assignHotelsToPackage(packageId, hotelIds);
        return ResponseEntity.ok(updatedPackage);
    }

    @PostMapping("/{packageId}/services")
    public ResponseEntity<PackageDTO> assignTourServicesToPackage(
            @PathVariable Long packageId,
            @RequestBody AssignTourServicesRequest request) {
        PackageDTO updatedPackage = packageService.assignTourServicesToPackage(
                packageId,
                request.getTourServiceIds()
        );
        return ResponseEntity.ok(updatedPackage);
    }

    @GetMapping("/{packageId}/available-services")
    public ResponseEntity<List<PackageTourServiceDTO>> getAvailableTourServices(
            @PathVariable Long packageId,
            @RequestParam(required = false) String category) {
        List<PackageTourServiceDTO> services = packageService.getAvailableTourServices(packageId, category);
        return ResponseEntity.ok(services);
    }
}