package com.hackathon.safenet.domain.model.meteoalarm;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MeteoAlarmResponse {
    private String title;
    private String description;
    private String link;
    private String language;
    private Integer ttl;
    private List<MeteoAlarmItem> items;
}