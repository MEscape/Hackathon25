package com.hackathon25.safenet.infrastructure.adapter.web.dto.emergency;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/** DTO representing a discoverable user with friend request status */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Discoverable user information with request status and mutual friends")
public class DiscoverableUserDto {

  @JsonProperty("id")
  @Schema(description = "User ID", example = "123e4567-e89b-12d3-a456-426614174001")
  private UUID id;

  @JsonProperty("username")
  @Schema(description = "Username", example = "john_doe")
  private String username;

  @JsonProperty("email")
  @Schema(description = "Email", example = "john@example.com")
  private String email;

  @JsonProperty("mutualFriends")
  @Schema(description = "Number of mutual friends", example = "3")
  private Integer mutualFriends;

  @JsonProperty("requestStatus")
  @Schema(
      description = "Friend request status",
      example = "none",
      allowableValues = {"none", "sent", "received", "friends"})
  private String requestStatus;
}
