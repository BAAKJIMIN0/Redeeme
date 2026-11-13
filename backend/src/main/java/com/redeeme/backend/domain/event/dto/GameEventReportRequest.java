package com.redeeme.backend.domain.event.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import com.redeeme.backend.domain.common.ReportSource;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GameEventReportRequest {
    private Long gameId;
    private String korName;
    private String title;
    private String description;
    private LocalDate eventDate;
    private LocalTime eventTime;
    private String link;
    private ReportSource source; // "AI" | "USER"(생략 시 USER)
}
