package com.DirectDealz.DirectDealz.Authentication.Repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.DirectDealz.DirectDealz.Authentication.Models.UserModel;
import java.util.List;
import com.DirectDealz.DirectDealz.Authentication.Enum.RequestStatus;


public interface UserRepository extends JpaRepository<UserModel, UUID> {
    
    UserModel findByEmail(String email);
    List<UserModel> findByRequestStatus(RequestStatus requestStatus);
}
