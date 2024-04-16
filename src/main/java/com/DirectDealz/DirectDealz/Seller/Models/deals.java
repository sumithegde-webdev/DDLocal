package com.DirectDealz.DirectDealz.Seller.Models;

import java.util.UUID;

import org.hibernate.annotations.GenericGenerator;
import org.springframework.stereotype.Component;

import com.DirectDealz.DirectDealz.Authentication.Enum.UserRole;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Component
@Table(name = "Deals")
public class deals {


    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "deal_id")
    private UUID id;

    private UUID product_id;


    private UUID buyer_id;


    private UUID seller_id;

  
    public boolean isSeller(UserRole userRole) {
        return userRole == UserRole.SELLER;
    }


    
    public boolean isBuyer(UserRole userRole) {
        return userRole == UserRole.BUYER;
    }


    
}
