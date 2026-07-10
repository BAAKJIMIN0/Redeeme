package com.redeeme.backend.domain.coupon.dto;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class AdminCouponCreateRequest {
    private String code;
    private String description;
    private Long gameId;
    private String korName;
    private String quickUrl;
    private List<Map<String, Object>> rewards;
    private String server;
    private LocalDate expiredAt;
}