package com.redeeme.backend.domain.coupon;

import lombok.Getter;

import java.time.LocalDate;

import com.fasterxml.jackson.databind.JsonNode;

@Getter
public class CouponResponse {
    private Long id;
    private Long gameId;
    private String korName;
    private String engName;
    private String slug;
    private String code;
    private String description;
    private String server;
    private JsonNode rewards;
    private LocalDate startedAt;
    private LocalDate expiredAt;
    private String quickUrl;

    public CouponResponse(Coupon coupon) {
        this.id = coupon.getId();
        this.gameId = coupon.getGame().getId();
        this.korName = coupon.getGame().getKorName();
        this.engName = coupon.getGame().getEngName();
        this.slug = coupon.getGame().getSlug();
        this.code = coupon.getCode();
        this.description = coupon.getDescription();
        this.server = coupon.getServer();
        this.rewards = coupon.getRewards();
        this.startedAt = coupon.getStartedAt();
        this.expiredAt = coupon.getExpiredAt();
        this.quickUrl = coupon.getQuickUrl();
    }
}