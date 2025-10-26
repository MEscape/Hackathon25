package com.hackathon25.safenet.domain.model.heatmapwarnings;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Warning {
    private String id;
    private String title;
    private String description;
    private String severity;
    private List<List<List<Double>>> polygon;
}
