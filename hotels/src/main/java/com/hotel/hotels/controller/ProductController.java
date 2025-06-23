package com.hotel.hotels.controller;

import com.hotel.hotels.dto.ProductCategoryDTO;
import com.hotel.hotels.dto.ProductDTO;
import com.hotel.hotels.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;


    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable Long id) {
        ProductDTO product = productService.getProductById(id);
        return ResponseEntity.ok(product);
    }

    // Category endpoints
    @PostMapping("/category")
    public ResponseEntity<ProductCategoryDTO> createCategory(@RequestBody ProductCategoryDTO categoryDTO) {
        ProductCategoryDTO createdCategory = productService.createCategory(categoryDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCategory);
    }

    @GetMapping
    public ResponseEntity<List<ProductDTO>> getAllProducts() {
        List<ProductDTO> products = productService.getAllProducts();
        return ResponseEntity.ok(products);
    }
    @GetMapping("/category")
    public ResponseEntity<List<ProductCategoryDTO>> getAllCategories() {
        List<ProductCategoryDTO> categories = productService.getAllCategories();
        return ResponseEntity.ok(categories);
    }

    // Product endpoints
    @PostMapping("/category/{categoryId}")
    public ResponseEntity<ProductDTO> createProductUnderCategory(
            @PathVariable Long categoryId,
            @RequestBody ProductDTO productDTO) {
        ProductDTO createdProduct = productService.createProductUnderCategory(categoryId, productDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdProduct);
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<ProductDTO>> getProductsByCategory(@PathVariable Long categoryId) {
        List<ProductDTO> products = productService.getProductsByCategory(categoryId);
        return ResponseEntity.ok(products);
    }
}