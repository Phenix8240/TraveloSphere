package com.hotel.hotels.controller;

import com.hotel.hotels.dto.ProductPurchaseDTO;
import com.hotel.hotels.dto.PurchaseRequestDTO;
import com.hotel.hotels.service.ProductPurchaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/purchases")
public class ProductPurchaseController {

    @Autowired
    private ProductPurchaseService purchaseService;

    @PostMapping
    public ResponseEntity<ProductPurchaseDTO> createPurchase(@RequestBody PurchaseRequestDTO purchaseRequest) {
        ProductPurchaseDTO purchase = purchaseService.createPurchase(purchaseRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(purchase);
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<ProductPurchaseDTO>> getPurchasesByCustomer(@PathVariable Long customerId) {
        List<ProductPurchaseDTO> purchases = purchaseService.getPurchasesByCustomer(customerId);
        return ResponseEntity.ok(purchases);
    }

    @GetMapping
    public ResponseEntity<List<ProductPurchaseDTO>> getAllPurchases() {
        List<ProductPurchaseDTO> purchases = purchaseService.getAllPurchases();
        return ResponseEntity.ok(purchases);
    }
    @GetMapping("/product/{productId}")
    public ResponseEntity<List<ProductPurchaseDTO>> getPurchasesByProduct(@PathVariable Long productId) {
        List<ProductPurchaseDTO> purchases = purchaseService.getPurchasesByProduct(productId);
        return ResponseEntity.ok(purchases);
    }
}