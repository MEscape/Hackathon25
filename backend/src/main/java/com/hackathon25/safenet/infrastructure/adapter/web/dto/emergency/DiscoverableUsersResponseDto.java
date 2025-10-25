package com.hackathon25.safenet.infrastructure.adapter.web.dto.emergency;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * Response wrapper for discoverable users list
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Response containing list of discoverable users")
public class DiscoverableUsersResponseDto {

    @JsonProperty("users")
    @Schema(description = "List of discoverable users with request status")
    private List<DiscoverableUserDto> users;

    public static DiscoverableUsersResponseDto from(List<DiscoverableUserDto> users) {
        return DiscoverableUsersResponseDto.builder()
                .users(users)
                .build();
    }
}