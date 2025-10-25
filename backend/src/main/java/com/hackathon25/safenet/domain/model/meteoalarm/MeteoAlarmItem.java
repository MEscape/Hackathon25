package com.hackathon25.safenet.domain.model.meteoalarm;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MeteoAlarmItem {
    private String title;
    private String description;
    private String link;
    private String guid;
    
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime pubDate;
    
    private String region;
    private Integer awarenessLevel;
    private Integer awarenessType;
    private LocalDateTime validFrom;
    private LocalDateTime validUntil;
    private String language;
}