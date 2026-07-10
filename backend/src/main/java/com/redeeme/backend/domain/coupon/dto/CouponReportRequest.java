package com.redeeme.backend.domain.coupon.dto;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CouponReportRequest {
    private Long gameId;
    private String korName;
    private String server;
    private String code;
    private String description;
    private List<Map<String, Object>> rewards;
    private LocalDate expiredAt;
    private String quickUrl;
}
