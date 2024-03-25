package com.DirectDealz.DirectDealz;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class DirectDealzApplication {

	public static void main(String[] args) {
		SpringApplication.run(DirectDealzApplication.class, args);
	}

}
