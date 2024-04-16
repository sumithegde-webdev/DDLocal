package com.DirectDealz.DirectDealz.Seller.Repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.DirectDealz.DirectDealz.Seller.Models.Product;

import java.util.List;
import java.util.Optional;


@Repository
public interface ProductRepository extends JpaRepository<Product,UUID> {
    
    @Query("SELECT p FROM Product p WHERE p.id = :productId AND p.userId = :userId")
    Optional<Product> findProductByUserId(UUID productId , UUID userId);



    List<Product> findByUserId(UUID userId);
}
