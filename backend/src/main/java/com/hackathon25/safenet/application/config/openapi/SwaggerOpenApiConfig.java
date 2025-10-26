package com.hackathon25.safenet.application.config.openapi;

import com.hackathon25.safenet.infrastructure.properties.ApplicationProperties;
import com.hackathon25.safenet.infrastructure.properties.SpringDoc;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Configuration class for OpenAPI (Swagger) documentation setup.
 *
 * <p>This configuration defines the OpenAPI metadata, security schemes (OAuth2 and Bearer token),
 * and external documentation links. It supports dynamic configuration of OAuth2 URLs and API
 * metadata via application properties. Since OpenAPI 3.0 allows only a single externalDocs element,
 * only the first configured external doc is added.
 *
 * <p>Used by the MotoSync services to expose Swagger UI with security configured for OAuth2
 * Authorization Code flow and JWT Bearer tokens.
 */
@Configuration
public class SwaggerOpenApiConfig {

  private final ApplicationProperties applicationProperties;

  /**
   * Constructs the SwaggerOpenApiConfig with injected SpringDoc properties.
   *
   * @param applicationProperties Consolidated SpringDoc configuration properties
   */
  public SwaggerOpenApiConfig(ApplicationProperties applicationProperties) {
    this.applicationProperties = applicationProperties;
  }

  /**
   * Bean configuration for the OpenAPI documentation.
   *
   * <p>This method configures the OpenAPI documentation, including basic metadata such as the
   * title, description, and version of the API. It also provides external documentation and sets up
   * OAuth2 security scheme. Note: OpenAPI 3.0 specification supports only one external
   * documentation link, so we use the first one from the configured list.
   *
   * @return The OpenAPI configuration bean.
   */
  @Bean
  public OpenAPI openApi() {
    SpringDoc.ApiDocs apiDocs = applicationProperties.getSpringDoc().getApiDocs();

    OpenAPI openApi =
        new OpenAPI()
            .info(
                new Info()
                    .title(apiDocs.getTitle())
                    .description(apiDocs.getDescription())
                    .version(apiDocs.getAppVersion()))
            .components(
                new Components()
                    .addSecuritySchemes("oauth2", createOauth2SecurityScheme())
                    .addSecuritySchemes("bearerAuth", createBearerTokenSecurityScheme()))
            .addSecurityItem(new SecurityRequirement().addList("oauth2"))
            .addSecurityItem(new SecurityRequirement().addList("bearerAuth"));

    // Add the first external documentation (OpenAPI 3.0 supports only one)
    if (apiDocs.getExternalDocs() != null && !apiDocs.getExternalDocs().isEmpty()) {
      SpringDoc.ExternalDoc firstDoc = apiDocs.getExternalDocs().getFirst();
      openApi.externalDocs(
          new ExternalDocumentation()
              .description(firstDoc.getDescription())
              .url(firstDoc.getUrl()));
    }

    return openApi;
  }

  /**
   * Creates OAuth2 security scheme for Swagger authorization.
   *
   * @return SecurityScheme configured for OAuth2
   */
  private SecurityScheme createOauth2SecurityScheme() {
    SpringDoc.Oauth oauth = applicationProperties.getSpringDoc().getSwaggerUi().getOauth();

    return new SecurityScheme()
        .type(SecurityScheme.Type.OAUTH2)
        .description("OAuth2 Authorization Code Flow")
        .flows(
            new OAuthFlows()
                .authorizationCode(
                    new OAuthFlow()
                        .authorizationUrl(oauth.getAuthorizationUrl())
                        .tokenUrl(oauth.getTokenUrl())
                        .scopes(
                            new Scopes()
                                .addString("profile", "Profile access")
                                .addString("openid", "OpenID Connect")
                                .addString("email", "Access to email address"))));
  }

  /**
   * Creates Bearer Token security scheme as an alternative.
   *
   * @return SecurityScheme configured for Bearer tokens
   */
  private SecurityScheme createBearerTokenSecurityScheme() {
    return new SecurityScheme()
        .type(SecurityScheme.Type.HTTP)
        .scheme("bearer")
        .bearerFormat("JWT")
        .description("JWT Bearer Token");
  }
}
