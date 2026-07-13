package com.redeeme.backend.domain.coupon.dto;

import java.time.LocalDateTime;

import com.redeeme.backend.domain.coupon.CouponIssueReport;

import lombok.Getter;

@Getter
public class CouponIssueReportResponse {
    private final Long id;
    private final Long reporterId;
    private final Long couponId;
    private final String couponCode;
    private final String korName;
    private final String server;
    private final String reason;
    private final String detail;
    private final LocalDateTime createdAt;

    public CouponIssueReportResponse(CouponIssueReport report) {
        this.id = report.getId();
        this.reporterId = report.getReporter().getId();
        this.couponId = report.getCoupon().getId();
        this.couponCode = report.getCoupon().getCode();
        this.korName = report.getCoupon().getGame().getKorName();
        this.server = report.getCoupon().getServer();
        this.reason = report.getReason();
        this.detail = report.getDetail();
        this.createdAt = report.getCreatedAt();
    }
}
