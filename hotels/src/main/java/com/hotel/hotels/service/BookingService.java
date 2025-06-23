package com.hotel.hotels.service;

import com.hotel.hotels.dto.BookingRequest;
import com.hotel.hotels.dto.BookingResponse;
import com.hotel.hotels.entity.*;
import com.hotel.hotels.exception.BookingNotFoundException;
import com.hotel.hotels.exception.RoomNotAvailableException;

import com.hotel.hotels.repo.CustomerRepository;
import com.hotel.hotels.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class BookingService {

    @Autowired
    private com.hotel.hotels.repository.BookingRepository bookingRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Transactional
    public BookingResponse createBooking(BookingRequest bookingRequest) {
        validateBookingDates(bookingRequest);

        Customer customer = customerRepository.findById(bookingRequest.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        Room room = roomRepository.findById(bookingRequest.getRoomId())
                .orElseThrow(() -> new RuntimeException("Room not found"));

        if (!isRoomAvailable(room.getId(), bookingRequest.getCheckInDate(), bookingRequest.getCheckOutDate())) {
            throw new RoomNotAvailableException("Room is not available for the selected dates");
        }

        long numberOfNights = ChronoUnit.DAYS.between(bookingRequest.getCheckInDate(), bookingRequest.getCheckOutDate());
        double totalPrice = numberOfNights * room.getPricePerNight();

        Booking booking = new Booking();
        booking.setCustomer(customer);
        booking.setRoom(room);
        booking.setCheckInDate(bookingRequest.getCheckInDate());
        booking.setCheckOutDate(bookingRequest.getCheckOutDate());
        booking.setTotalPrice(totalPrice);
        booking.setStatus("CONFIRMED");

        Booking savedBooking = bookingRepository.save(booking);
        return BookingResponse.fromEntities(savedBooking);
    }

    public BookingResponse getBookingById(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new BookingNotFoundException("Booking not found with id: " + bookingId));
        return BookingResponse.fromEntities(booking);
    }

    @Transactional
    public BookingResponse cancelBooking(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new BookingNotFoundException("Booking not found"));

        if (booking.getStatus().equals("CANCELLED")) {
            throw new RuntimeException("Booking is already cancelled");
        }

        booking.setStatus("CANCELLED");
        Booking updatedBooking = bookingRepository.save(booking);
        return BookingResponse.fromEntities(updatedBooking);
    }

    @Transactional
    public BookingResponse updateBooking(Long bookingId, BookingRequest bookingRequest) {
        validateBookingDates(bookingRequest);

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new BookingNotFoundException("Booking not found"));

        if (booking.getStatus().equals("CANCELLED")) {
            throw new RuntimeException("Cannot update a cancelled booking");
        }

        // Check if room is available for new dates (excluding current booking)
        if (!isRoomAvailableForUpdate(booking.getRoom().getId(), bookingId,
                bookingRequest.getCheckInDate(), bookingRequest.getCheckOutDate())) {
            throw new RoomNotAvailableException("Room is not available for the selected dates");
        }

        long numberOfNights = ChronoUnit.DAYS.between(bookingRequest.getCheckInDate(), bookingRequest.getCheckOutDate());
        double totalPrice = numberOfNights * booking.getRoom().getPricePerNight();

        booking.setCheckInDate(bookingRequest.getCheckInDate());
        booking.setCheckOutDate(bookingRequest.getCheckOutDate());
        booking.setTotalPrice(totalPrice);

        Booking updatedBooking = bookingRepository.save(booking);
        return BookingResponse.fromEntities(updatedBooking);
    }

    public List<BookingResponse> getCustomerBookings(Long customerId) {
        List<Booking> bookings = bookingRepository.findByCustomerId(customerId);
        return bookings.stream()
                .map(BookingResponse::fromEntities)
                .toList();
    }

    private boolean isRoomAvailable(Long roomId, LocalDate checkInDate, LocalDate checkOutDate) {
        List<Booking> overlappingBookings = bookingRepository.findOverlappingBookings(roomId, checkInDate, checkOutDate);
        return overlappingBookings.isEmpty();
    }

    private boolean isRoomAvailableForUpdate(Long roomId, Long bookingId, LocalDate checkInDate, LocalDate checkOutDate) {
        List<Booking> overlappingBookings = bookingRepository.findOverlappingBookingsExcludingCurrent(
                roomId, bookingId, checkInDate, checkOutDate);
        return overlappingBookings.isEmpty();
    }

    private void validateBookingDates(BookingRequest bookingRequest) {
        if (bookingRequest.getCheckInDate().isAfter(bookingRequest.getCheckOutDate())) {
            throw new IllegalArgumentException("Check-in date must be before check-out date");
        }

        if (bookingRequest.getCheckInDate().isBefore(LocalDate.now())) {
            throw new IllegalArgumentException("Check-in date cannot be in the past");
        }
    }
}