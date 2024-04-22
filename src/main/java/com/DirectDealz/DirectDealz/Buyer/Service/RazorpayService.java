package com.DirectDealz.DirectDealz.Buyer.Service;

import org.springframework.stereotype.Service;

import com.razorpay.*;
@Service
public class RazorpayService {
    
    
    private String keyId;


    private String keySecret;

    public Payment verifyPayment(String paymentId) throws RazorpayException {
        RazorpayClient razorpayClient = new RazorpayClient(keyId, keySecret);
    
        try {
            // Fetch the payment details from Razorpay
            Payment payment = razorpayClient.payments.fetch(paymentId);
    
            // Verify the payment status
            if (payment != null && payment.get("status") != null && payment.get("status").equals("captured")) {
                // Check for Razorpay reference ID to ensure payment integrity
                String razorpayReferenceId = payment.get("razorpay_reference_id");
                if (razorpayReferenceId == null || razorpayReferenceId.isEmpty()) {
                    throw new RazorpayException("Razorpay reference ID not found.");
                }
    
                return payment;
            } else {
                throw new RazorpayException("Payment not captured or payment details not found.");
            }
        } catch (RazorpayException e) {
            throw new RazorpayException("Error verifying payment: " + e.getMessage());
        } catch (Exception e) {
            throw new RazorpayException("Internal Server Error: " + e.getMessage());
        }
    }
    
}
