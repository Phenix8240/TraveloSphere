package com.hotel.hotels.service;

import com.hotel.hotels.entity.ServiceProvider;
import com.hotel.hotels.entity.TourService;
import com.hotel.hotels.exception.ResourceNotFoundException;
import com.hotel.hotels.repo.TourServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class TourServiceService {

    @Autowired
    private TourServiceRepository serviceRepository;

    @Autowired
    private ServiceProviderService providerService;

    // CREATE
    @Transactional
    public TourService createServiceForProvider(Long providerId, TourService service) {
        ServiceProvider provider = providerService.getProviderById(providerId);
        service.setProvider(provider);
        return serviceRepository.save(service);
    }

    // READ
    public List<TourService> getServicesByProvider(Long providerId) {
        return serviceRepository.findByProviderIdAndActiveTrue(providerId);
    }

    public TourService getServiceById(Long serviceId) {
        return serviceRepository.findById(serviceId)
                .orElseThrow(() -> new ResourceNotFoundException("TourService not found"));
    }

    public List<TourService> getAvailableServices(String category) {
        if (category != null) {
            return serviceRepository.findByCategoryAndActiveTrue(category);
        }
        return serviceRepository.findByActiveTrue();
    }

    // UPDATE
    @Transactional
    public TourService updateService(Long serviceId, TourService serviceDetails) {
        TourService service = getServiceById(serviceId);
        service.setName(serviceDetails.getName());
        service.setDescription(serviceDetails.getDescription());
        service.setPrice(serviceDetails.getPrice());
        service.setDuration(serviceDetails.getDuration());
        service.setCategory(serviceDetails.getCategory());
        return serviceRepository.save(service);
    }

    // DELETE (Soft Delete)
    @Transactional
    public void deactivateService(Long serviceId) {
        TourService service = getServiceById(serviceId);
        service.setActive(false);
        serviceRepository.save(service);
    }
    public List<TourService> getServicesByIds(List<Long> ids) {
        return serviceRepository.findByIdIn(ids);
    }
}