package com.redeeme.backend.domain.event;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

import com.redeeme.backend.domain.common.ReportSource;
import com.redeeme.backend.domain.game.Game;
import com.redeeme.backend.domain.user.User;

import jakarta.persistence.Entity;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "game_event_reports")
@Getter @Setter
@NoArgsConstructor
public class GameEventReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reporter_id")
    private User reporter;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "game_id")
    private Game game;

    private String korName;
    private String title;
    private String description;
    private LocalDate eventDate;
    private LocalTime eventTime;
    private String link;
    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "varchar(10) not null default 'USER'")
    private ReportSource source = ReportSource.USER;

    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
