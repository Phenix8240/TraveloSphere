package com.hotel.hotels.repo;

import com.hotel.hotels.entity.ServiceProvider;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ServiceProviderRepository extends JpaRepository<ServiceProvider, Long> {
    List<ServiceProvider> findByActiveTrue();
}