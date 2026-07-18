package com.redeeme.backend.domain.event.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class AdminGameEventRequest {
    private Long gameId;
    private String title;
    private String description;
    private LocalDate eventDate;
    private LocalTime eventTime;
    private String link;
}
