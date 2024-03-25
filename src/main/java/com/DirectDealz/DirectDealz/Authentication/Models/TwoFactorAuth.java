package com.DirectDealz.DirectDealz.Authentication.Models;
import org.springframework.stereotype.Component;

import lombok.Data;

@Data
@Component
public class TwoFactorAuth {
    private String email;
    private int otp;
}
