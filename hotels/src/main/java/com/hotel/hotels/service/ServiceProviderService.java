package com.hotel.hotels.service;

import com.hotel.hotels.entity.ServiceProvider;
import com.hotel.hotels.exception.ResourceNotFoundException;
import com.hotel.hotels.repo.ServiceProviderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class ServiceProviderService {

    @Autowired
    private ServiceProviderRepository providerRepository;

    // CREATE
    public ServiceProvider createProvider(ServiceProvider provider) {
        return providerRepository.save(provider);
    }

    // READ
    public List<ServiceProvider> getAllActiveProviders() {
        return providerRepository.findByActiveTrue();
    }

    public ServiceProvider getProviderById(Long id) {
        return providerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ServiceProvider not found"));
    }

    // UPDATE
    @Transactional
    public ServiceProvider updateProvider(Long id, ServiceProvider providerDetails) {
        ServiceProvider provider = getProviderById(id);
        provider.setName(providerDetails.getName());
        provider.setContactNumber(providerDetails.getContactNumber());
        provider.setEmail(providerDetails.getEmail());
        provider.setAddress(providerDetails.getAddress());
        provider.setRegistrationNumber(providerDetails.getRegistrationNumber());
        provider.setRating(providerDetails.getRating());
        provider.setProviderType(providerDetails.getProviderType());
        return providerRepository.save(provider);
    }

    // DELETE (Soft Delete)
    @Transactional
    public void deactivateProvider(Long id) {
        ServiceProvider provider = getProviderById(id);
        provider.setActive(false);
        providerRepository.save(provider);
    }
}