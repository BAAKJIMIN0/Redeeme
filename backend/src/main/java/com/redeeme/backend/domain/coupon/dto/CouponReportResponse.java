package com.redeeme.backend.domain.coupon.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.redeeme.backend.domain.coupon.CouponReport;

import lombok.Getter;

@Getter
public class CouponReportResponse {
    private final Long id;
    private final Long reporterId;
    private final Long gameId;
    private final String korName;
    private final String server;
    private final String code;
    private final String description;
    private final List<Map<String, Object>> rewards;
    private final LocalDate expiredAt;
    private final String quickUrl;
    private final LocalDateTime createdAt;

    @SuppressWarnings("unchecked")
    public CouponReportResponse(CouponReport report) {
        this.id = report.getId();
        this.reporterId = report.getReporter().getId();
        this.gameId = report.getGame() != null ? report.getGame().getId() : null;
        this.korName = report.getKorName();
        this.server = report.getServer();
        this.code = report.getCode();
        this.description = report.getDescription();
        this.expiredAt = report.getExpiredAt();
        this.quickUrl = report.getQuickUrl();
        this.createdAt = report.getCreatedAt();

        ObjectMapper mapper = new ObjectMapper();
        if (report.getRewards() != null) {
            this.rewards = mapper.convertValue(report.getRewards(), List.class);
        } else {
            this.rewards = List.of();
        }
    }
}
