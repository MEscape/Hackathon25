package com.hackathon25.safenet.infrastructure.adapter.web.exception;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Map;

/**
 * Standardized error response structure for the SafeNet application.
 * Provides consistent error information across all API endpoints.
 */
@Data
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ErrorResponse {
    
    /**
     * Timestamp when the error occurred
     */
    private LocalDateTime timestamp;
    
    /**
     * HTTP status code
     */
    private int status;
    
    /**
     * Error type or category
     */
    private String error;
    
    /**
     * Human-readable error message
     */
    private String message;
    
    /**
     * Request path where the error occurred
     */
    private String path;
    
    /**
     * Additional error details (e.g., validation errors)
     */
    private Map<String, String> details;
    
    /**
     * Trace ID for debugging (can be added later)
     */
    private String traceId;
}