package com.redeeme.backend.domain.coupon;

import com.redeeme.backend.domain.game.Game; // Game 엔티티 임포트

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "coupons")
@Getter @Setter
@NoArgsConstructor
public class Coupon {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "game_id")
    private Game game;
    private String code;
    @Column(columnDefinition = "TEXT")
    private String description;
    private String server;
    private String reward;
    private String started_at;
    private String expired_at;
    private String quickUrl;
}