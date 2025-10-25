package com.hackathon25.safenet.infrastructure.adapter.web.dto.emergency;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * Response wrapper for emergency contacts list
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Response containing list of emergency contacts")
public class EmergencyContactsResponseDto {

    @JsonProperty("contacts")
    @Schema(description = "List of emergency contacts (friends)")
    private List<EmergencyContactDto> contacts;

    public static EmergencyContactsResponseDto from(List<EmergencyContactDto> contacts) {
        return EmergencyContactsResponseDto.builder()
                .contacts(contacts)
                .build();
    }
}