package com.DirectDealz.DirectDealz.Seller.Services;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.DirectDealz.DirectDealz.Authentication.Enum.UserRole;
import com.DirectDealz.DirectDealz.Authentication.Models.ResponseMessage;
import com.DirectDealz.DirectDealz.Authentication.Models.UserModel;
import com.DirectDealz.DirectDealz.Authentication.Repository.UserRepository;
import com.DirectDealz.DirectDealz.Authentication.Services.AuthService;
import com.DirectDealz.DirectDealz.Seller.Models.Product;
import com.DirectDealz.DirectDealz.Seller.Repository.ProductRepository;

@Service
public class ProductService {
    
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private AuthService authService;

    @Autowired
    private ResponseMessage responseMessage;

    @Autowired
    private UserRepository userRepository;


    public ResponseEntity<Object> createProduct(Product product,String token ) {
        try {
            if (!authService.isTokenValid(token)) {
                responseMessage.setSuccess(false);
                responseMessage.setMessage("Invalid token");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseMessage);
            }
            String email=authService.verifyToken(token);
            UserModel user=userRepository.findByEmail(email);
            if (user.getUserRole() != UserRole.SELLER) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Only sellers are allowed to create products.");
            }
            product.setUserId(user.getId());
            Product savedProduct = productRepository.save(product);
            return ResponseEntity.ok(savedProduct);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error: " + e.getMessage());
        }
    }



    public ResponseEntity<Object> deleteProduct(UUID productId, String token) {
        try {
            if (!authService.isTokenValid(token)) {
                responseMessage.setSuccess(false);
                responseMessage.setMessage("Invalid token");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseMessage);
            }
            String email = authService.verifyToken(token);
            UserModel user = userRepository.findByEmail(email);
            Optional<Product> productOptional = productRepository.findById(productId);
            if (user.getUserRole() != UserRole.SELLER) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access to this Resource is Denied.");
            }
            if (productOptional.isPresent()) {
                Product product = productOptional.get();
                if (!product.getUserId().equals(user.getId())) {
                    return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You are not authorized to delete this product.");
                }
                productRepository.delete(product);
                return ResponseEntity.ok("Product deleted successfully.");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error: " + e.getMessage());
        }
    }
    

    public ResponseEntity<Object> updateProduct(UUID productId, Product updatedProduct, String token) {
        try {
            if (!authService.isTokenValid(token)) {
                responseMessage.setSuccess(false);
                responseMessage.setMessage("Invalid token");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseMessage);
            }
            String email = authService.verifyToken(token);
            UserModel user = userRepository.findByEmail(email);
            Optional<Product> existingProductOptional = productRepository.findById(productId);
            if (user.getUserRole() != UserRole.SELLER) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access to this Resource is Denied.");
            }
            if (!existingProductOptional.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found.");
            }
            Product existingProduct = existingProductOptional.get();
            if (!existingProduct.getUserId().equals(user.getId())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You are not authorized to update this product.");
            }
            // Update fields of the existing product
            existingProduct.setTitle(updatedProduct.getTitle());
            existingProduct.setDescription(updatedProduct.getDescription());
            existingProduct.setPrice(updatedProduct.getPrice());

            // Save the updated product
            Product savedProduct = productRepository.save(existingProduct);
            return ResponseEntity.ok(savedProduct);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error: " + e.getMessage());
        }
    }
    

    // Listing all products present in the database for particular seller

    public ResponseEntity<Object> getProductsBySeller(String token) {
        try {
            if (!authService.isTokenValid(token)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
            }

            String email = authService.verifyToken(token);
            UserModel user = userRepository.findByEmail(email);
            if (user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
            }

            if (user.getUserRole() != UserRole.SELLER) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access to this Resource is Denied.");
            }

            List<Product> products = productRepository.findByUserId(user.getId());
            return ResponseEntity.ok(products);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error: " + e.getMessage());
        }
    }
}
