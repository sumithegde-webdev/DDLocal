package com.DirectDealz.DirectDealz.Dashboard.Repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.DirectDealz.DirectDealz.Seller.Models.Product;

@Repository
public interface ListRepository extends JpaRepository<Product,UUID> {
    List<Product> findByProductcity(String productcity);

}
