package com.hotel.hotels.repository;

import com.hotel.hotels.entity.Booking;
import com.hotel.hotels.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByCustomerId(Long customerId);

    @Query("SELECT b FROM Booking b WHERE b.room.id = :roomId AND " +
            "((b.checkInDate <= :checkOutDate AND b.checkOutDate >= :checkInDate) AND b.status = 'CONFIRMED')")
    List<Booking> findOverlappingBookings(@Param("roomId") Long roomId,
                                          @Param("checkInDate") LocalDate checkInDate,
                                          @Param("checkOutDate") LocalDate checkOutDate);

    @Query("SELECT b FROM Booking b WHERE b.room.id = :roomId AND b.id != :bookingId AND " +
            "((b.checkInDate <= :checkOutDate AND b.checkOutDate >= :checkInDate) AND b.status = 'CONFIRMED')")
    List<Booking> findOverlappingBookingsExcludingCurrent(@Param("roomId") Long roomId,
                                                          @Param("bookingId") Long bookingId,
                                                          @Param("checkInDate") LocalDate checkInDate,
                                                          @Param("checkOutDate") LocalDate checkOutDate);
}