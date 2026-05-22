package com.hotel.hotels.service;

import com.hotel.hotels.dto.ProductCategoryDTO;
import com.hotel.hotels.dto.ProductDTO;
import com.hotel.hotels.entity.Product;
import com.hotel.hotels.entity.ProductCategory;
import com.hotel.hotels.exception.CategoryNotFoundException;
import com.hotel.hotels.repo.ProductCategoryRepository;
import com.hotel.hotels.repo.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductCategoryRepository categoryRepository;

    // Category operations
    @Transactional
    public ProductCategoryDTO createCategory(ProductCategoryDTO categoryDTO) {
        ProductCategory category = new ProductCategory();
        category.setName(categoryDTO.getName());
        category.setDescription(categoryDTO.getDescription());

        ProductCategory savedCategory = categoryRepository.save(category);
        return mapToCategoryDTO(savedCategory);
    }

    // Product operations
    @Transactional
    public ProductDTO createProductUnderCategory(Long categoryId, ProductDTO productDTO) {
        ProductCategory category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new CategoryNotFoundException("Category not found"));

        Product product = new Product();
        product.setName(productDTO.getName());
        product.setDescription(productDTO.getDescription());
        product.setPrice(productDTO.getPrice());
        product.setStockQuantity(productDTO.getStockQuantity());
        product.setCategory(category);

        Product savedProduct = productRepository.save(product);
        return mapToProductDTO(savedProduct);
    }

    public List<ProductDTO> getProductsByCategory(Long categoryId) {
        return productRepository.findByCategoryId(categoryId).stream()
                .map(this::mapToProductDTO)
                .collect(Collectors.toList());
    }

    public List<ProductCategoryDTO> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(this::mapToCategoryDTO)
                .collect(Collectors.toList());
    }


    public List<ProductDTO> getAllProducts() {
        return productRepository.findAll().stream()
                .map(this::mapToProductDTO)
                .collect(Collectors.toList());
    }

    public ProductDTO getProductById(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found with ID: " + productId));
        return mapToProductDTO(product);
    }

    // Mapping methods
    private ProductCategoryDTO mapToCategoryDTO(ProductCategory category) {
        ProductCategoryDTO dto = new ProductCategoryDTO();
        dto.setId(category.getId());
        dto.setName(category.getName());
        dto.setDescription(category.getDescription());
        return dto;
    }

    private ProductDTO mapToProductDTO(Product product) {
        ProductDTO dto = new ProductDTO();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setDescription(product.getDescription());
        dto.setPrice(product.getPrice());
        dto.setStockQuantity(product.getStockQuantity());
        dto.setCategoryName(product.getCategory().getName());
        return dto;
    }
}