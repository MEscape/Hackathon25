package com.hackathon25.safenet.infrastructure.properties;

import lombok.Data;

@Data
public class Security {

  private boolean httpsOnly = false;

  private String[] corsAllowedOrigins = {"http://localhost:8081"};
}
