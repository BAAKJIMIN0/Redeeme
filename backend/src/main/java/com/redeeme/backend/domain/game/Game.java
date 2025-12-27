package com.redeeme.backend.domain.game;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "games")
@Getter @Setter
@NoArgsConstructor
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "korName")
    private String korName;

    @Column(name = "engName")
    private String engName;

    @Column(unique = true)
    private String slug;

    @Column(name = "active")
    private Boolean active;

    @Column(name = "priority")
    private int priority;
}