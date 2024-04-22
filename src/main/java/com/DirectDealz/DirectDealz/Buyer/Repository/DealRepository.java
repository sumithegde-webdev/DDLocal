package com.DirectDealz.DirectDealz.Buyer.Repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.DirectDealz.DirectDealz.Buyer.Models.Deal;

@Repository
public interface DealRepository extends JpaRepository<Deal,UUID>{
    
}
