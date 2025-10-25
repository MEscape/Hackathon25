package com.hackathon25.safenet.application.config.security;

import com.hackathon25.safenet.infrastructure.properties.ApplicationProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.time.Duration;
import java.util.Arrays;

/**
 * Cross-Origin Resource Sharing (CORS) configuration for the SafeNet application.
 *
 * <p>This configuration creates a CORS setup that allows controlled cross-origin
 * access to the SafeNet API. The configuration is designed to be secure by default
 * while supporting legitimate frontend applications and development environments.</p>
 *
 * <h3>CORS Configuration Details</h3>
 * <ul>
 *   <li><strong>Allowed Origins:</strong> Configured via application properties for environment-specific control</li>
 *   <li><strong>Allowed Methods:</strong> GET, POST, PUT, DELETE, OPTIONS for full REST API support</li>
 *   <li><strong>Allowed Headers:</strong> Authorization, Content-Type, Accept for JWT and JSON support</li>
 *   <li><strong>Exposed Headers:</strong> Location for RESTful resource creation responses</li>
 *   <li><strong>Credentials:</strong> Enabled to support authenticated cross-origin requests</li>
 *   <li><strong>Max Age:</strong> 1 hour caching to reduce preflight requests</li>
 * </ul>
 *
 * <h3>Security Considerations</h3>
 * <ul>
 *   <li>Origins are explicitly configured (no wildcard with credentials)</li>
 *   <li>Headers are restricted to necessary authentication and content headers</li>
 *   <li>Methods are limited to standard REST operations</li>
 *   <li>Preflight caching reduces unnecessary OPTIONS requests</li>
 * </ul>
 *
 */
@Configuration
@RequiredArgsConstructor
public class CorsSecurityConfig {

    private final ApplicationProperties applicationProperties;

    /**
     * Configures Cross-Origin Resource Sharing (CORS) for the SafeNet application.
     *
     * @return the configured CorsConfigurationSource
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        // Set allowed origins from configuration
        configuration.setAllowedOrigins(Arrays.asList(
            applicationProperties.getSecurity().getCorsAllowedOrigins()));

        // Set allowed methods
        configuration.setAllowedMethods(Arrays.asList(
            "GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD"));

        // Set allowed headers
        configuration.setAllowedHeaders(Arrays.asList(
            "Authorization", "Content-Type", "X-Requested-With", "Accept",
            "Origin", "Access-Control-Request-Method", "Access-Control-Request-Headers"));

        // Allow credentials
        configuration.setAllowCredentials(true);

        // Set max age for preflight requests
        configuration.setMaxAge(Duration.ofHours(1));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
}