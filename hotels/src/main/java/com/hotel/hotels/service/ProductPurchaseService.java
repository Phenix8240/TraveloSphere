package com.hotel.hotels.service;

import com.hotel.hotels.dto.ProductPurchaseDTO;
import com.hotel.hotels.dto.PurchaseRequestDTO;
import com.hotel.hotels.entity.*;
import com.hotel.hotels.exception.ResourceNotFoundException;

import com.hotel.hotels.repo.CustomerRepository;
import com.hotel.hotels.repo.ProductPurchaseRepository;
import com.hotel.hotels.repo.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductPurchaseService {

    @Autowired
    private ProductPurchaseRepository purchaseRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private ProductRepository productRepository;

    @Transactional
    public ProductPurchaseDTO createPurchase(PurchaseRequestDTO purchaseRequest) {
        // Validate customer
        Customer customer = customerRepository.findById(purchaseRequest.getCustomerId())
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));

        // Validate product and stock
        Product product = productRepository.findById(purchaseRequest.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        if (product.getStockQuantity() < purchaseRequest.getQuantity()) {
            throw new ResourceNotFoundException("Not enough stock available");
        }

        // Update product stock
        product.setStockQuantity(product.getStockQuantity() - purchaseRequest.getQuantity());
        productRepository.save(product);

        // Create purchase record
        ProductPurchase purchase = new ProductPurchase();
        purchase.setPurchaseDate(LocalDateTime.now());
        purchase.setQuantity(purchaseRequest.getQuantity());
        purchase.setTotalPrice(product.getPrice() * purchaseRequest.getQuantity());
        purchase.setCustomer(customer);
        purchase.setProduct(product);

        ProductPurchase savedPurchase = purchaseRepository.save(purchase);
        return mapToDTO(savedPurchase);
    }

    public List<ProductPurchaseDTO> getAllPurchases() {
        return purchaseRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }
    public List<ProductPurchaseDTO> getPurchasesByCustomer(Long customerId) {
        return purchaseRepository.findByCustomerId(customerId).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public List<ProductPurchaseDTO> getPurchasesByProduct(Long productId) {
        return purchaseRepository.findByProductId(productId).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    private ProductPurchaseDTO mapToDTO(ProductPurchase purchase) {
        ProductPurchaseDTO dto = new ProductPurchaseDTO();
        dto.setId(purchase.getId());
        dto.setPurchaseDate(purchase.getPurchaseDate());
        dto.setQuantity(purchase.getQuantity());
        dto.setTotalPrice(purchase.getTotalPrice());
        dto.setCustomerId(purchase.getCustomer().getId());
        dto.setProductId(purchase.getProduct().getId());
        dto.setProductName(purchase.getProduct().getName());
        return dto;
    }
}