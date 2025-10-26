package com.hackathon25.safenet;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class SafeNetApplication {

	public static void main(String[] args) {
		SpringApplication.run(SafeNetApplication.class, args);
	}

}
