package com.hackathon25.safenet.infrastructure.security;

import com.hackathon25.safenet.domain.port.inbound.SyncUserPort;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationListener;
import org.springframework.security.authentication.event.AuthenticationSuccessEvent;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

/**
 * Listens to authentication success events and syncs users from JWT token to local database.
 * This approach eliminates the need for webhooks by syncing users automatically
 * on every successful authentication. User data is extracted from the JWT token
 * issued by Keycloak.
 * Benefits:
 * - 100% reliable - no webhook delivery issues
 * - Always syncs latest user data on login
 * - No missing user IDs
 * - Simpler architecture
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class JwtUserSyncFilter implements ApplicationListener<AuthenticationSuccessEvent> {

    private final SyncUserPort syncUserPort;

    @Override
    public void onApplicationEvent(AuthenticationSuccessEvent event) {
        if (event.getAuthentication() instanceof JwtAuthenticationToken jwtAuth) {
            try {
                syncUserFromJwt(jwtAuth.getToken());
            } catch (Exception e) {
                log.error("Failed to sync user from JWT", e);
                // Don't fail authentication if sync fails
            }
        }
    }

    private void syncUserFromJwt(Jwt jwt) {
        // Extract user ID from JWT 'sub' claim (Keycloak user ID)
        String subClaim = jwt.getClaimAsString("sub");
        if (subClaim == null || subClaim.isBlank()) {
            log.warn("JWT missing 'sub' claim, cannot sync user");
            return;
        }

        UUID userId = UUID.fromString(subClaim);

        // Extract standard claims
        String username = jwt.getClaimAsString("preferred_username");
        String email = jwt.getClaimAsString("email");
        String firstName = jwt.getClaimAsString("given_name");
        String lastName = jwt.getClaimAsString("family_name");

        // Extract additional attributes for metadata
        Map<String, Object> attributes = new HashMap<>();

        // Add email verification status
        Boolean emailVerified = jwt.getClaimAsBoolean("email_verified");
        if (emailVerified != null) {
            attributes.put("email_verified", emailVerified);
        }

        // Add realm roles
        Map<String, Object> realmAccess = jwt.getClaim("realm_access");
        if (realmAccess != null && realmAccess.containsKey("roles")) {
            attributes.put("realm_roles", realmAccess.get("roles"));
        }

        // Add resource/client roles
        Map<String, Object> resourceAccess = jwt.getClaim("resource_access");
        if (resourceAccess != null) {
            attributes.put("resource_access", resourceAccess);
        }

        // Add any custom claims
        attributes.put("name", jwt.getClaimAsString("name"));

        log.info("Syncing user from JWT: id={}, username={}", userId, username);

        // Sync to database
        syncUserPort.syncUser(userId, username, email, firstName, lastName, attributes);
    }
}