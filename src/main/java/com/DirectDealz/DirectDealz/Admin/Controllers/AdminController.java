package com.DirectDealz.DirectDealz.Admin.Controllers;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.DirectDealz.DirectDealz.Admin.Service.AdminService;
import com.DirectDealz.DirectDealz.Buyer.Models.Deal;

@RestController
@CrossOrigin(origins = "http://localhost/5173")
@RequestMapping("api/admin")
public class AdminController {
    
    @Autowired
    private AdminService adminService;

    @GetMapping("alldeals")
    public ResponseEntity<Object> getAllDeals(@RequestHeader String token) {
        return adminService.getAllDeals(token);
    }

    @GetMapping("/deals/{dealId}")
    public ResponseEntity<Object> getDealById(@PathVariable UUID dealId, @RequestHeader String token) {
        return adminService.getDealById(dealId, token);
    }

    @PutMapping("/deals/{dealId}")
    public ResponseEntity<Object> updateDeal(@PathVariable UUID dealId, @RequestBody Deal updatedDeal, @RequestHeader String token) {
        return adminService.updateDeal(dealId, updatedDeal, token);
    }

    @DeleteMapping("deals/{dealId}")
    public ResponseEntity<Object> deleteDeal(@PathVariable UUID dealId, @RequestHeader String token) {
        return adminService.deleteDeal(dealId, token);
    }

    @GetMapping("/pending-requests")
    public ResponseEntity<Object> getAllPendingRequests(@RequestHeader String token) {
        return adminService.getAllPendingRequests(token);
    }


    @PostMapping("/approve-request/{userId}")
    public ResponseEntity<Object> approveRequest(@PathVariable UUID userId, @RequestHeader String token) {
        return adminService.approveRequest(userId, token);
    }
}
