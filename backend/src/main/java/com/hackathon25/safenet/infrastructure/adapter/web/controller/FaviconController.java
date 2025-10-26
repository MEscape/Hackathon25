package com.hackathon25.safenet.infrastructure.adapter.web.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controller to handle favicon.ico requests. Returns a 204 No Content response to prevent error
 * logs when browsers request the favicon.
 */
@RestController
public class FaviconController {

  @GetMapping("/favicon.ico")
  public ResponseEntity<Void> favicon() {
    // Return 204 No Content to prevent error logs
    return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
  }
}
