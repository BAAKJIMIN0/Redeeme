package com.redeeme.backend.domain.event.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import com.redeeme.backend.domain.event.GameEvent;

import lombok.Getter;

@Getter
public class GameEventResponse {
    private Long id;
    private Long gameId;
    private String korName;
    private String engName;
    private String slug;
    private String title;
    private String description;
    private LocalDate eventDate;
    private LocalTime eventTime;
    private String link;

    public GameEventResponse(GameEvent event) {
        this.id = event.getId();
        this.gameId = event.getGame().getId();
        this.korName = event.getGame().getKorName();
        this.engName = event.getGame().getEngName();
        this.slug = event.getGame().getSlug();
        this.title = event.getTitle();
        this.description = event.getDescription();
        this.eventDate = event.getEventDate();
        this.eventTime = event.getEventTime();
        this.link = event.getLink();
    }
}
