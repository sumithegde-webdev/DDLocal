package com.DirectDealz.DirectDealz.Admin.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.DirectDealz.DirectDealz.Authentication.Enum.RequestStatus;
import com.DirectDealz.DirectDealz.Authentication.Enum.UserRole;
import com.DirectDealz.DirectDealz.Authentication.Models.ResponseMessage;
import com.DirectDealz.DirectDealz.Authentication.Models.UserModel;
import com.DirectDealz.DirectDealz.Authentication.Repository.UserRepository;
import com.DirectDealz.DirectDealz.Authentication.Services.AuthService;
import com.DirectDealz.DirectDealz.Buyer.Models.Deal;
import com.DirectDealz.DirectDealz.Buyer.Repository.DealRepository;

@Service
public class AdminService {
    
    @Autowired
    private DealRepository dealRepository;

    @Autowired
    private AuthService authService;

    @Autowired
    private ResponseMessage responseMessage;

    @Autowired
    private UserRepository userRepository;

    public ResponseEntity<Object> getAllDeals(String token) {
        try {
            if (!authService.isTokenValid(token)) {
                responseMessage.setSuccess(false);
                responseMessage.setMessage("Invalid token");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseMessage);
            }
            String email = authService.verifyToken(token);
            UserModel user = userRepository.findByEmail(email);

            // Check if the user is Admin
            if (user.getUserRole() != UserRole.ADMIN) {
                responseMessage.setSuccess(false);
                responseMessage.setMessage("Only Admin role can Access this URL");
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(responseMessage);
                
            }
            List<Deal> deals = dealRepository.findAll();
            return ResponseEntity.ok(deals);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error retrieving deals: " + e.getMessage());
        }
    }

    public ResponseEntity<Object> getDealById(UUID dealId, String token) {
        try {
            if (!authService.isTokenValid(token)) {
                responseMessage.setSuccess(false);
                responseMessage.setMessage("Invalid token");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseMessage);
            }
            String email = authService.verifyToken(token);
            UserModel user = userRepository.findByEmail(email);

            // Check if the user is Admin
            if (user.getUserRole() != UserRole.ADMIN) {
                responseMessage.setSuccess(false);
                responseMessage.setMessage("Only Admin role can Access this URL");
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(responseMessage);
                
            }
            Optional<Deal> dealOptional = dealRepository.findById(dealId);
            if (dealOptional.isPresent()) {
                return ResponseEntity.ok(dealOptional.get());
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Deal not found with ID: " + dealId);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error retrieving deal: " + e.getMessage());
        }
    }


    public ResponseEntity<Object> updateDeal(UUID dealId, Deal updatedDeal , String token) {
        try {
            if (!authService.isTokenValid(token)) {
                responseMessage.setSuccess(false);
                responseMessage.setMessage("Invalid token");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseMessage);
            }
            String email = authService.verifyToken(token);
            UserModel user = userRepository.findByEmail(email);

            // Check if the user is Admin
            if (user.getUserRole() != UserRole.ADMIN) {
                responseMessage.setSuccess(false);
                responseMessage.setMessage("Only Admin role can Access this URL");
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(responseMessage);
                
            }
            Optional<Deal> existingDealOptional = dealRepository.findById(dealId);
            if (existingDealOptional.isPresent()) {
                Deal existingDeal = existingDealOptional.get();
                existingDeal.setProductId(updatedDeal.getProductId());
                existingDeal.setBuyerId(updatedDeal.getBuyerId());
                existingDeal.setSellerId(updatedDeal.getSellerId());
                existingDeal.setTimestamp(updatedDeal.getTimestamp());
                existingDeal.setPaymentReference(updatedDeal.getPaymentReference());
                Deal updatedDealResult = dealRepository.save(existingDeal);
                return ResponseEntity.ok(updatedDealResult);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Deal not found with ID: " + dealId);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating deal: " + e.getMessage());
        }
    }

    public ResponseEntity<Object> deleteDeal(UUID dealId, String token) {
        try {
            if (!authService.isTokenValid(token)) {
                responseMessage.setSuccess(false);
                responseMessage.setMessage("Invalid token");
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(responseMessage);
            }
            String email = authService.verifyToken(token);
            UserModel user = userRepository.findByEmail(email);

            // Check if the user is Admin
            if (user.getUserRole() != UserRole.ADMIN) {
                responseMessage.setSuccess(false);
                responseMessage.setMessage("Only Admin role can Access this URL");
                return ResponseEntity.badRequest().body(responseMessage);
                
            }
            Optional<Deal> existingDealOptional = dealRepository.findById(dealId);
            if (existingDealOptional.isPresent()) {
                dealRepository.deleteById(dealId);
                return ResponseEntity.ok("Deal deleted successfully");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Deal not found with ID: " + dealId);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting deal: " + e.getMessage());
        }
    }



    public ResponseEntity<Object> getAllPendingRequests(String token) {
        try {
            // Check if the token is valid and user is Admin
            if (!authService.isTokenValid(token)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
            }
            String email = authService.verifyToken(token);
            UserModel user = userRepository.findByEmail(email);

            if (user.getUserRole() != UserRole.ADMIN) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Only Admin can access this URL");
            }

            // Fetch all users with pending requests
            List<UserModel> usersWithPendingRequests = userRepository.findByRequestStatus(RequestStatus.PENDING);

            return ResponseEntity.ok(usersWithPendingRequests);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching pending requests: " + e.getMessage());
        }
    }
    

    public ResponseEntity<Object> approveRequest(UUID userId, String token) {
        try {
            // Check if the token is valid and the user is an admin
            if (!authService.isTokenValid(token)) {
                responseMessage.setSuccess(false);
                responseMessage.setMessage("Invalid token");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseMessage);
            }

            String email = authService.verifyToken(token);
            UserModel adminUser = userRepository.findByEmail(email);

            // Check if the logged-in user is an admin
            if (!adminUser.getUserRole().equals(UserRole.ADMIN)) {
                responseMessage.setSuccess(false);
                responseMessage.setMessage("Only admins can access this URL.");
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(responseMessage);
            }

            // Find the user by ID
            UserModel user = userRepository.findById(userId).orElse(null);
            if (user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
            }

            // Check if the user's request is pending
            if (user.getRequestStatus().equals(RequestStatus.PENDING)) {
                user.setRequestStatus(RequestStatus.APPROVED);
                user.setUserRole(UserRole.SELLER);
                userRepository.save(user);
                responseMessage.setSuccess(true);
                responseMessage.setMessage("Request approved successfully.");
                return ResponseEntity.ok(responseMessage);
            } else {
                responseMessage.setSuccess(false);
                responseMessage.setMessage("Request is Already Approved or User has not Requested for Seller Role.");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseMessage);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error approving request: " + e.getMessage());
        }
    }
}
