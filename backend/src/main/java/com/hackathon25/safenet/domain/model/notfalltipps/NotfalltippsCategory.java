package com.hackathon.safenet.domain.model.notfalltipps;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class NotfalltippsCategory {
    private String title;
    private List<NotfalltippsTip> tips;
    private List<String> eventCodes;
    private long lastModificationDate;
}