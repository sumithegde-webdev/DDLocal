package com.DirectDealz.DirectDealz.Authentication.Repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.DirectDealz.DirectDealz.Authentication.Models.UserModel;

public interface UserRepository extends JpaRepository<UserModel, UUID> {
    
    UserModel findByEmail(String email);
}
