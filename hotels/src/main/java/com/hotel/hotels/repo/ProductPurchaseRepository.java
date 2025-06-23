package com.hotel.hotels.repo;

import com.hotel.hotels.entity.ProductPurchase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductPurchaseRepository extends JpaRepository<ProductPurchase, Long> {
    List<ProductPurchase> findByCustomerId(Long customerId);
    List<ProductPurchase> findByProductId(Long productId);
}