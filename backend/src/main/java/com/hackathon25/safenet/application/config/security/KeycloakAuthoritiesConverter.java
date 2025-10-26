package com.hackathon25.safenet.application.config.security;

import java.util.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;

/**
 * Converter that extracts Spring Security authorities from Keycloak JWT claims.
 *
 * <p>This component provides a centralized way to extract authorities from both JWT tokens (dev)
 * and opaque token introspection responses (prod), ensuring consistent authority mapping across all
 * environments.
 *
 * <h3>Authority Mapping</h3>
 *
 * <ul>
 *   <li><strong>Realm Roles:</strong> Extracted from 'realm_access.roles' → ROLE_*
 *   <li><strong>Scopes:</strong> Extracted from 'scope' claim → SCOPE_*
 * </ul>
 *
 * <h3>Usage</h3>
 *
 * <pre>
 * // For JWT tokens (dev)
 * Collection&lt;GrantedAuthority&gt; authorities = converter.extractAuthoritiesFromJwt(jwt);
 *
 * // For opaque token claims (prod)
 * List&lt;GrantedAuthority&gt; authorities = converter.extractAuthoritiesFromClaims(claims);
 * </pre>
 */
@Component
public class KeycloakAuthoritiesConverter {

  /**
   * Extracts authorities from a JWT token. Used in development environment with JWT authentication.
   *
   * @param jwt the JWT token
   * @return collection of granted authorities
   */
  public Collection<GrantedAuthority> extractAuthoritiesFromJwt(Jwt jwt) {
    Map<String, Object> claims = jwt.getClaims();
    return extractAuthoritiesFromClaims(claims);
  }

  /**
   * Extracts authorities from token claims map. Used in production environment with opaque token
   * introspection.
   *
   * @param claims the claims map from token introspection or JWT
   * @return list of granted authorities
   */
  public List<GrantedAuthority> extractAuthoritiesFromClaims(Map<String, Object> claims) {
    List<GrantedAuthority> authorities = new ArrayList<>();

    // Extract realm roles from realm_access.roles
    authorities.addAll(extractRealmRoles(claims));

    // Extract scopes
    authorities.addAll(extractScopes(claims));

    return authorities;
  }

  /**
   * Extracts realm roles from the realm_access claim.
   *
   * @param claims the token claims
   * @return list of authorities for realm roles
   */
  private List<GrantedAuthority> extractRealmRoles(Map<String, Object> claims) {
    List<GrantedAuthority> authorities = new ArrayList<>();

    Object realmAccess = claims.get("realm_access");
    if (realmAccess instanceof Map) {
      @SuppressWarnings("unchecked")
      Map<String, Object> realmAccessMap = (Map<String, Object>) realmAccess;
      Object rolesObj = realmAccessMap.get("roles");

      if (rolesObj instanceof Collection) {
        @SuppressWarnings("unchecked")
        Collection<String> roles = (Collection<String>) rolesObj;
        authorities.addAll(
            roles.stream()
                .map(role -> new SimpleGrantedAuthority("ROLE_" + role.toUpperCase()))
                .toList());
      }
    }

    return authorities;
  }

  /**
   * Extracts scopes from the scope claim. Handles both space-separated string format and collection
   * format.
   *
   * @param claims the token claims
   * @return list of authorities for scopes
   */
  private List<GrantedAuthority> extractScopes(Map<String, Object> claims) {
    List<GrantedAuthority> authorities = new ArrayList<>();

    Object scopeClaim = claims.get("scope");
    if (scopeClaim != null) {
      List<String> scopes = new ArrayList<>();

      if (scopeClaim instanceof String) {
        // Space-separated string (standard OAuth2 format)
        scopes.addAll(Arrays.asList(((String) scopeClaim).split(" ")));
      } else if (scopeClaim instanceof Collection) {
        // Already a collection (some Keycloak configurations)
        ((Collection<?>) scopeClaim).forEach(s -> scopes.add(s.toString()));
      }

      authorities.addAll(
          scopes.stream()
              .filter(s -> !s.isEmpty())
              .map(s -> new SimpleGrantedAuthority("SCOPE_" + s.toUpperCase()))
              .toList());
    }

    return authorities;
  }
}
