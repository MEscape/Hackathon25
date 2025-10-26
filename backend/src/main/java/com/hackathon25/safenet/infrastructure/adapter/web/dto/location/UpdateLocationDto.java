package com.hackathon25.safenet.infrastructure.adapter.web.dto.location;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/** Data Transfer Object for updating user location. */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Request to update user location")
public class UpdateLocationDto {

  private static final String LATITUDE_RANGE_MESSAGE = "Latitude must be between -90 and 90";
  private static final String LONGITUDE_RANGE_MESSAGE = "Longitude must be between -180 and 180";

  @JsonProperty("latitude")
  @NotNull(message = "Latitude is required")
  @DecimalMin(value = "-90.0", message = LATITUDE_RANGE_MESSAGE)
  @DecimalMax(value = "90.0", message = LATITUDE_RANGE_MESSAGE)
  @Schema(description = "Latitude coordinate", example = "52.5200", minimum = "-90", maximum = "90")
  private BigDecimal latitude;

  @JsonProperty("longitude")
  @NotNull(message = "Longitude is required")
  @DecimalMin(value = "-180.0", message = LONGITUDE_RANGE_MESSAGE)
  @DecimalMax(value = "180.0", message = LONGITUDE_RANGE_MESSAGE)
  @Schema(
      description = "Longitude coordinate",
      example = "13.4050",
      minimum = "-180",
      maximum = "180")
  private BigDecimal longitude;

  @JsonProperty("altitude")
  @Schema(description = "Altitude in meters (optional)", example = "100.5")
  private BigDecimal altitude;

  @JsonProperty("accuracy")
  @DecimalMin(value = "0.0", message = "Accuracy must be non-negative")
  @Schema(description = "Location accuracy in meters (optional)", example = "5.0", minimum = "0")
  private BigDecimal accuracy;

  @JsonProperty("visibleToFriends")
  @Schema(
      description = "Whether location should be visible to friends",
      example = "true",
      defaultValue = "true")
  private Boolean visibleToFriends;
}
