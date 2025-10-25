package com.hackathon.safenet.domain.model.notfalltipps;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class NotfalltippsRoot {
    private List<NotfalltippsCategory> category;
    private long lastModificationDate;
}