package com.hotel.hotels.repository;

import com.hotel.hotels.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface RoomRepository extends JpaRepository<Room, Long> {
    List<Room> findByHotelId(Long hotelId);

    @Query("SELECT r FROM Room r WHERE r.hotel.id = :hotelId AND r.availability = true AND r.id NOT IN " +
            "(SELECT b.room.id FROM Booking b WHERE b.room.hotel.id = :hotelId AND " +
            "((b.checkInDate <= :checkOutDate AND b.checkOutDate >= :checkInDate) AND b.status = 'CONFIRMED'))")
    List<Room> findAvailableRoomsByHotelAndDates(@Param("hotelId") Long hotelId,
                                                 @Param("checkInDate") LocalDate checkInDate,
                                                 @Param("checkOutDate") LocalDate checkOutDate);
}