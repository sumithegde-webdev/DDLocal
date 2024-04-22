package com.DirectDealz.DirectDealz.Buyer.Service;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.DirectDealz.DirectDealz.Authentication.Enum.UserRole;
import com.DirectDealz.DirectDealz.Authentication.Models.UserModel;
import com.DirectDealz.DirectDealz.Authentication.Repository.UserRepository;
import com.DirectDealz.DirectDealz.Authentication.Services.AuthService;
import com.DirectDealz.DirectDealz.Buyer.Models.Deal;
import com.DirectDealz.DirectDealz.Buyer.Repository.DealRepository;
import com.DirectDealz.DirectDealz.Seller.Enum.ProductStatus;
import com.DirectDealz.DirectDealz.Seller.Models.Product;
import com.DirectDealz.DirectDealz.Seller.Repository.ProductRepository;

@Service
public class DealService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DealRepository dealRepository;

    @Autowired
    private AuthService authService;

    public ResponseEntity<Object> lockProductForDeal(UUID productId, String token) {
        try {
            if (!authService.isTokenValid(token)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
            }

            String email = authService.verifyToken(token);
            UserModel user = userRepository.findByEmail(email);
            if (user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
            }

            if (user.getUserRole() != UserRole.BUYER && user.getUserRole() != UserRole.SELLER) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body("Only buyers and sellers are allowed to lock deals.");
            }

            // Find the product by ID
            Product product = productRepository.findById(productId).orElse(null);
            if (product == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found");
            }

            // Check if the user is buying their own product
            if (user.getUserRole() == UserRole.SELLER && product.getUserId().equals(user.getId())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Sellers cannot buy their own products.");
            }

            if (product.getProductStatus() == ProductStatus.SOLD) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Product is Already Sold");
            }
            // Create a new deal
            Deal deal = new Deal();
            deal.setProductId(productId);
            deal.setBuyerId(user.getId());
            deal.setSellerId(product.getUserId());
            deal.setTimestamp(LocalDateTime.now());

            // Save the deal in the database
            dealRepository.save(deal);
            product.setProductStatus(ProductStatus.SOLD);
            productRepository.save(product);

            return ResponseEntity.ok("Deal locked successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Internal Server Error: " + e.getMessage());
        }
    }

}
