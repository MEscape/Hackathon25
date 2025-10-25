package com.hackathon25.safenet.infrastructure.adapter.web.dto.emergency;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Generic response DTO for friend request operations
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Response for friend request operations")
public class FriendRequestResponseDto {

    @JsonProperty("success")
    @Schema(description = "Whether the operation was successful", example = "true")
    private boolean success;

    @JsonProperty("message")
    @Schema(description = "Optional message about the operation", example = "Friend request sent successfully")
    private String message;

    public static FriendRequestResponseDto success(String message) {
        return FriendRequestResponseDto.builder()
                .success(true)
                .message(message)
                .build();
    }

    public static FriendRequestResponseDto error(String message) {
        return FriendRequestResponseDto.builder()
                .success(false)
                .message(message)
                .build();
    }
}