package com.redeeme.backend.domain.event.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

import com.redeeme.backend.domain.event.GameEventReport;

import lombok.Getter;

@Getter
public class GameEventReportResponse {
    private final Long id;
    private final Long reporterId;
    private final Long gameId;
    private final String korName;
    private final String title;
    private final String description;
    private final LocalDate eventDate;
    private final LocalTime eventTime;
    private final String link;
    private final LocalDateTime createdAt;

    public GameEventReportResponse(GameEventReport report) {
        this.id = report.getId();
        this.reporterId = report.getReporter().getId();
        this.gameId = report.getGame() != null ? report.getGame().getId() : null;
        this.korName = report.getKorName();
        this.title = report.getTitle();
        this.description = report.getDescription();
        this.eventDate = report.getEventDate();
        this.eventTime = report.getEventTime();
        this.link = report.getLink();
        this.createdAt = report.getCreatedAt();
    }
}
