package com.DirectDealz.DirectDealz.Authentication.Repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.DirectDealz.DirectDealz.Authentication.Models.OTPModel;

import java.util.List;
import java.time.LocalDateTime;

public interface OTPRepository extends JpaRepository<OTPModel, UUID> {

    OTPModel findByEmail(String email);

    List<OTPModel> findByCreatedAt(LocalDateTime createdAt);

}