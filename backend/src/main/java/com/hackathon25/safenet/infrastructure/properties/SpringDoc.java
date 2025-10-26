package com.hackathon25.safenet.infrastructure.properties;

import java.util.List;
import lombok.Data;

/**
 * Configuration properties for SpringDoc OpenAPI documentation.
 *
 * <p>This class consolidates all SpringDoc-related configuration properties including API docs
 * metadata, Swagger UI settings, OAuth configuration, and external documentation links.
 */
@Data
public class SpringDoc {

  private ApiDocs apiDocs = new ApiDocs();
  private SwaggerUi swaggerUi = new SwaggerUi();

  /** Configuration properties for API documentation metadata. */
  @Data
  public static class ApiDocs {
    private String title;
    private String description;
    private String appVersion;
    private List<ExternalDoc> externalDocs;
  }

  /** Configuration properties for Swagger UI settings. */
  @Data
  public static class SwaggerUi {
    private Oauth oauth = new Oauth();
  }

  /** Configuration properties for OAuth settings. */
  @Data
  public static class Oauth {
    private String authorizationUrl;
    private String tokenUrl;
  }

  /** Configuration properties for external documentation. */
  @Data
  public static class ExternalDoc {
    private String description;
    private String url;
  }
}
