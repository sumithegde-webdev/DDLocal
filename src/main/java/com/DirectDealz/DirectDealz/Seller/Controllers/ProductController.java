package com.DirectDealz.DirectDealz.Seller.Controllers;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.DirectDealz.DirectDealz.Seller.Models.Product;
import com.DirectDealz.DirectDealz.Seller.Services.ProductService;

@RestController
@RequestMapping("api")
public class ProductController {
    
    @Autowired
    private ProductService productService;

    @PostMapping("products/create")
    public ResponseEntity<Object> createProduct(@RequestBody Product product,
                                                @RequestHeader String token) {
        return productService.createProduct(product, token);
    }

    @DeleteMapping("/products/{productId}")
    public ResponseEntity<Object> deleteProduct(@RequestParam("productId") UUID productId, @RequestHeader String token) {
        return productService.deleteProduct(productId, token);
    }
    
    

    @PutMapping("/{productId}")
    public ResponseEntity<Object> updateProduct(
            @RequestParam UUID productId,
            @RequestBody Product updatedProduct,
            @RequestHeader String token) {
        return productService.updateProduct(productId, updatedProduct, token);
    }


    
    @GetMapping("/productslisted")
    public ResponseEntity<Object> getProductsBySeller(
            @RequestHeader String token) {
        return productService.getProductsBySeller(token);
    }
}
