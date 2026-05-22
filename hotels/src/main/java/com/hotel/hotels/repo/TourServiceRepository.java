package com.hotel.hotels.repo;

import com.hotel.hotels.entity.TourService;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TourServiceRepository extends JpaRepository<TourService, Long> {
    List<TourService> findByProviderIdAndActiveTrue(Long providerId);
    List<TourService> findByCategoryAndActiveTrue(String category);
    List<TourService> findByActiveTrue();
    List<TourService> findByIdIn(List<Long> ids);

}