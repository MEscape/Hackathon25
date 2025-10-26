package com.hackathon25.safenet.application.config.security;

import com.hackathon25.safenet.infrastructure.properties.ApplicationProperties;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.DefaultOAuth2AuthenticatedPrincipal;
import org.springframework.security.oauth2.core.DelegatingOAuth2TokenValidator;
import org.springframework.security.oauth2.core.OAuth2AuthenticatedPrincipal;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtTimestampValidator;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.introspection.OpaqueTokenIntrospector;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.header.writers.ReferrerPolicyHeaderWriter;

/**
 * Profile-based OAuth2 Resource Server security configuration for the SafeNet application.
 *
 * <p>This configuration adapts authentication strategy based on the active Spring profile:
 *
 * <ul>
 *   <li><strong>Development (dev):</strong> Uses JWT validation with JWK Set
 *   <li><strong>Production (prod):</strong> Uses opaque token introspection
 * </ul>
 *
 * <h3>Development Profile (JWT)</h3>
 *
 * <p>Validates JWT tokens locally using Keycloak's public keys (JWK Set). Faster and doesn't
 * require a network call per request.
 *
 * <h3>Production Profile (Opaque Token)</h3>
 *
 * <p>Validates tokens via introspection endpoint. More secure as tokens can be revoked immediately
 * and validation is centralized.
 */
@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
public class ResourceServerSecurityConfig {

  private final ApplicationProperties applicationProperties;
  private final CorsSecurityConfig corsSecurityConfig;
  private final KeycloakAuthoritiesConverter authoritiesConverter;

  /** Common HTTP security configuration shared between profiles. */
  private HttpSecurity configureCommonSecurity(HttpSecurity http) throws Exception {
    return http
        // Disable CSRF for stateless API
        .csrf(AbstractHttpConfigurer::disable)

        // Configure CORS
        .cors(cors -> cors.configurationSource(corsSecurityConfig.corsConfigurationSource()))

        // Configure session management
        .sessionManagement(
            session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

        // Configure security headers
        .headers(
            headers ->
                headers
                    .frameOptions(HeadersConfigurer.FrameOptionsConfig::deny)
                    .contentTypeOptions(contentTypeOptions -> {})
                    .httpStrictTransportSecurity(
                        hsts -> hsts.maxAgeInSeconds(31536000).includeSubDomains(true))
                    .referrerPolicy(
                        referrer ->
                            referrer.policy(
                                ReferrerPolicyHeaderWriter.ReferrerPolicy
                                    .STRICT_ORIGIN_WHEN_CROSS_ORIGIN)))

        // Configure HTTPS enforcement if enabled
        .requiresChannel(
            channel -> {
              if (applicationProperties.getSecurity().isHttpsOnly()) {
                channel.anyRequest().requiresSecure();
              }
            })

        // Configure authorization rules
        .authorizeHttpRequests(
            auth ->
                auth
                    // Public endpoints
                    .requestMatchers("/actuator/health")
                    .permitAll()
                    .requestMatchers("/api/v1/public/**")
                    .permitAll()
                    .requestMatchers("/swagger-ui/**", "/v3/api-docs/**")
                    .permitAll()
                    .requestMatchers("/error")
                    .permitAll()

                    // All other endpoints require authentication
                    .anyRequest()
                    .authenticated());
  }

  /**
   * JWT-based security filter chain for development profile.
   *
   * <p>Uses local JWT validation with JWK Set for faster token validation. Suitable for development
   * where token revocation is less critical.
   *
   * @param http the HttpSecurity configuration object
   * @param jwtDecoder the JWT decoder bean (auto-configured by Spring Boot)
   * @return the configured SecurityFilterChain for JWT authentication
   * @throws Exception if security configuration fails
   */
  @Bean
  @Order(2)
  @Profile("dev")
  public SecurityFilterChain jwtFilterChain(HttpSecurity http, JwtDecoder jwtDecoder)
      throws Exception {
    configureCommonSecurity(http);

    // Configure JWT converter with custom authorities
    JwtAuthenticationConverter jwtAuthConverter = new JwtAuthenticationConverter();
    jwtAuthConverter.setJwtGrantedAuthoritiesConverter(
        jwt -> {
          Map<String, Object> claims = jwt.getClaims();
          return authoritiesConverter.extractAuthoritiesFromClaims(claims);
        });

    // Create a custom JWT decoder that skips issuer validation
    NimbusJwtDecoder customDecoder = (NimbusJwtDecoder) jwtDecoder;
    customDecoder.setJwtValidator(
        new DelegatingOAuth2TokenValidator<>(
            new JwtTimestampValidator()
            // Issuer validator intentionally omitted for dev environment
            ));

    return http.oauth2ResourceServer(
            oauth2 ->
                oauth2.jwt(
                    jwt -> jwt.decoder(customDecoder).jwtAuthenticationConverter(jwtAuthConverter)))
        .build();
  }

  /**
   * Opaque token-based security filter chain for production profile.
   *
   * <p>Uses token introspection for validation. More secure as it allows immediate token revocation
   * and centralized validation.
   *
   * @param http the HttpSecurity configuration object
   * @param delegate the opaque token introspector (auto-configured by Spring Boot)
   * @return the configured SecurityFilterChain for opaque token authentication
   * @throws Exception if security configuration fails
   */
  @Bean
  @Order(2)
  @Profile("prod")
  public SecurityFilterChain opaqueTokenFilterChain(
      HttpSecurity http, OpaqueTokenIntrospector delegate) throws Exception {

    configureCommonSecurity(http);

    return http.oauth2ResourceServer(
            oauth2 ->
                oauth2.opaqueToken(
                    token ->
                        token.introspector(
                            t -> {
                              OAuth2AuthenticatedPrincipal principal = delegate.introspect(t);
                              Map<String, Object> claims = principal.getAttributes();

                              String principalName = (String) claims.get("sub");
                              List<GrantedAuthority> authorities =
                                  authoritiesConverter.extractAuthoritiesFromClaims(claims);

                              return new DefaultOAuth2AuthenticatedPrincipal(
                                  principalName, claims, authorities);
                            })))
        .build();
  }
}
