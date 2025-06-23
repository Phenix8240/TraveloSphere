package com.hotel.hotels.service;

import com.hotel.hotels.dto.HotelDTO;
import com.hotel.hotels.dto.RoomDTO;

import java.util.List;



public interface HotelService {
    HotelDTO createHotel(HotelDTO hotelDTO);
    HotelDTO getHotelById(Long hotelId);
    List<HotelDTO> getAllHotels();
}