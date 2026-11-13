package com.redeeme.backend.domain.coupon.dto;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import com.redeeme.backend.domain.common.ReportSource;

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
    private ReportSource source; // "AI" | "USER"(생략 시 USER)
}
