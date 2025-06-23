package com.hotel.hotels.service;

import com.hotel.hotels.entity.Room;
import com.hotel.hotels.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class RoomService {

    @Autowired
    private RoomRepository roomRepository;

    public List<Room> getAvailableRooms(Long hotelId, LocalDate checkInDate, LocalDate checkOutDate) {
        return roomRepository.findAvailableRoomsByHotelAndDates(hotelId, checkInDate, checkOutDate);
    }
}