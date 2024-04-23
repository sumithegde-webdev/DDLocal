package com.DirectDealz.DirectDealz.Dashboard.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.DirectDealz.DirectDealz.Authentication.Services.AuthService;
import com.DirectDealz.DirectDealz.Dashboard.Repository.ListRepository;
import com.DirectDealz.DirectDealz.Seller.Models.Product;

@Service
public class ListingService {
    
    @Autowired
    private AuthService authService;

    @Autowired
    private ListRepository listRepository;

    public ResponseEntity<Object> listAllProducts(String token) {
        try {
            if (!authService.isTokenValid(token)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
            }
    
            List<Product> productList = listRepository.findAll();

            return ResponseEntity.ok(productList);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Internal Server Error: " + e.getMessage());
        }
    }


    public ResponseEntity<Object> findProductsByCity(String city, String token) {
        try {
            if (!authService.isTokenValid(token)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
            }
    
                 List<Product> productsByCity = listRepository.findByProductcity(city);
            return ResponseEntity.ok(productsByCity);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error:" + e.getMessage());
        }
       
    }

}
