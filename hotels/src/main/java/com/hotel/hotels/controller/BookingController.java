package com.hotel.hotels.controller;

import com.hotel.hotels.dto.BookingRequest;
import com.hotel.hotels.dto.BookingResponse;
import com.hotel.hotels.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    // Create new booking
    @PostMapping
    public ResponseEntity<BookingResponse> createBooking(@RequestBody BookingRequest bookingRequest) {
        BookingResponse response = bookingService.createBooking(bookingRequest);
        return ResponseEntity.ok(response);
    }

    // Get all bookings for a customer
    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<BookingResponse>> getCustomerBookings(@PathVariable Long customerId) {
        List<BookingResponse> responses = bookingService.getCustomerBookings(customerId);
        return ResponseEntity.ok(responses);
    }

    // Get booking by ID
    @GetMapping("/{bookingId}")
    public ResponseEntity<BookingResponse> getBookingById(@PathVariable Long bookingId) {
        BookingResponse response = bookingService.getBookingById(bookingId);
        return ResponseEntity.ok(response);
    }

    // Cancel a booking
    @PutMapping("/{bookingId}/cancel")
    public ResponseEntity<BookingResponse> cancelBooking(@PathVariable Long bookingId) {
        BookingResponse response = bookingService.cancelBooking(bookingId);
        return ResponseEntity.ok(response);
    }

    // Update booking dates
    @PutMapping("/{bookingId}")
    public ResponseEntity<BookingResponse> updateBooking(
            @PathVariable Long bookingId,
            @RequestBody BookingRequest bookingRequest) {
        BookingResponse response = bookingService.updateBooking(bookingId, bookingRequest);
        return ResponseEntity.ok(response);
    }
}