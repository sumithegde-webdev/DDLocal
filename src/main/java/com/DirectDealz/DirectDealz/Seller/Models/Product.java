package com.DirectDealz.DirectDealz.Seller.Models;

import java.math.BigDecimal;
import java.util.UUID;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.stereotype.Component;
import com.DirectDealz.DirectDealz.Authentication.Enum.UserRole;
import com.DirectDealz.DirectDealz.Seller.Enum.ProductStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Component
@Table(name = "Products")
public class Product {
    
       
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "product_id")
    private UUID id;

    private UUID userId;

    private String title;

    private String description;

    private BigDecimal price;
        
    @Enumerated(EnumType.STRING)
    private ProductStatus productStatus = ProductStatus.AVAILABLE; // Default status is Available 
    
    @CreationTimestamp
    private LocalDateTime createdAt;


    public boolean isSeller(UserRole userRole) {
        return userRole == UserRole.SELLER;
    }

}
