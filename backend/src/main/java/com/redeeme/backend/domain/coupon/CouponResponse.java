package com.redeeme.backend.domain.coupon;

import lombok.Getter;

@Getter
public class CouponResponse {
    private Long id;
    private Long game_id;
    private String kor_name;
    private String eng_name;
    private String slug;
    private String code;
    private String description;
    private String server;
    private String reward;
    private String started_at;
    private String expired_at;
    private String quickUrl;

    // Entity를 DTO로 변환해주는 생성자
    public CouponResponse(Coupon coupon) {
        this.id = coupon.getId();
        this.game_id = coupon.getGame().getId();
        this.kor_name = coupon.getGame().getKor_name();
        this.eng_name = coupon.getGame().getEng_name();
        this.slug = coupon.getGame().getSlug();
        this.code = coupon.getCode();
        this.description = coupon.getDescription();
        this.server = coupon.getServer();
        this.reward = coupon.getReward();
        this.started_at = coupon.getStarted_at();
        this.expired_at = coupon.getExpired_at();
        this.quickUrl = coupon.getQuickUrl();
    }
}