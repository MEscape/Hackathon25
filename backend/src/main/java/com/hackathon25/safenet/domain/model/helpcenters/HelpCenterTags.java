package com.hackathon25.safenet.domain.model.helpcenters;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HelpCenterTags {

        private String name;
        private String amenity;

        // Getter & Setter

}
