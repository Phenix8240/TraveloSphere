//package com.hotel.hotels.controller;
//
//import com.hotel.hotels.entity.TourService;
//import com.hotel.hotels.service.TourServiceService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/providers/{providerId}/services")
//public class TourServiceController {
//
//    @Autowired
//    private TourServiceService tourServiceService;
//
//    @PostMapping
//    public ResponseEntity<TourService> createService(
//            @PathVariable Long providerId,
//            @RequestBody TourService service) {
//        return ResponseEntity.status(HttpStatus.CREATED)
//                .body(tourServiceService.createServiceForProvider(providerId, service));
//    }
//
//    @GetMapping
//    public ResponseEntity<List<TourService>> getServicesByProvider(
//            @PathVariable Long providerId) {
//        return ResponseEntity.ok(tourServiceService.getServicesByProvider(providerId));
//    }
//}