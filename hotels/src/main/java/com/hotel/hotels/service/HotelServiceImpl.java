package com.hotel.hotels.service;

import com.hotel.hotels.dto.HotelDTO;
import com.hotel.hotels.dto.RoomDTO;
import com.hotel.hotels.entity.Hotel;
import com.hotel.hotels.entity.Room;
import com.hotel.hotels.repo.HotelRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;



@Service
public class HotelServiceImpl implements HotelService {

    @Autowired
    private HotelRepository hotelRepository;

    @Autowired
    private com.hotel.hotels.repository.RoomRepository roomRepository;

    @Override
    public HotelDTO createHotel(HotelDTO hotelDTO) {
        Hotel hotel = new Hotel();
        hotel.setName(hotelDTO.getName());
        hotel.setLocation(hotelDTO.getLocation());
        hotel.setRating(hotelDTO.getRating());

        // Save rooms
        List<Room> rooms = hotelDTO.getRooms().stream()
                .map(roomDTO -> {
                    Room room = new Room();
                    room.setRoomNumber(roomDTO.getRoomNumber());
                    room.setType(roomDTO.getType());
                    room.setPricePerNight(roomDTO.getPricePerNight());
                    room.setAvailability(roomDTO.isAvailability());
                    room.setAmenities(roomDTO.getAmenities());
                    room.setHotel(hotel);
                    return room;
                })
                .collect(Collectors.toList());

        hotel.setRooms(rooms);
        Hotel savedHotel = hotelRepository.save(hotel);
        return mapToHotelDTO(savedHotel);
    }

    @Override
    public HotelDTO getHotelById(Long hotelId) {
        Hotel hotel = hotelRepository.findById(hotelId)
                .orElseThrow(() -> new RuntimeException("Hotel not found"));
        return mapToHotelDTO(hotel);
    }

    @Override
    public List<HotelDTO> getAllHotels() {
        List<Hotel> hotels = hotelRepository.findAll();
        return hotels.stream().map(this::mapToHotelDTO).collect(Collectors.toList());
    }

    // Helper methods to map entities to DTOs
    private HotelDTO mapToHotelDTO(Hotel hotel) {
        HotelDTO hotelDTO = new HotelDTO();
        hotelDTO.setId(hotel.getId());
        hotelDTO.setName(hotel.getName());
        hotelDTO.setLocation(hotel.getLocation());
        hotelDTO.setRating(hotel.getRating());

        List<RoomDTO> roomDTOs = hotel.getRooms().stream()
                .map(this::mapToRoomDTO)
                .collect(Collectors.toList());
        hotelDTO.setRooms(roomDTOs);

        return hotelDTO;
    }

    private RoomDTO mapToRoomDTO(Room room) {
        RoomDTO roomDTO = new RoomDTO();
        roomDTO.setId(room.getId());
        roomDTO.setRoomNumber(room.getRoomNumber());
        roomDTO.setType(room.getType());
        roomDTO.setPricePerNight(room.getPricePerNight());
        roomDTO.setAvailability(room.isAvailability());
        roomDTO.setAmenities(room.getAmenities());
        return roomDTO;
    }
}