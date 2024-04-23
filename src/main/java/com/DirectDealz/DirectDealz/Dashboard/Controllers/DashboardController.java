package com.DirectDealz.DirectDealz.Dashboard.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.DirectDealz.DirectDealz.Dashboard.Service.ListingService;

@RestController
@RequestMapping("api")
public class DashboardController {
    
    @Autowired
    private ListingService listingService;

    @GetMapping("/listedproducts")
    public ResponseEntity<Object> listAllProducts(@RequestHeader String token) {
        return listingService.listAllProducts(token);
    }

    @GetMapping("/listbycity/{city}")
    public ResponseEntity<Object> getProductsByCity(@PathVariable String city, @RequestHeader String token) {
        return listingService.findProductsByCity(city, token);
    }
}
