package com.redeeme.backend.domain.coupon.dto;

import com.redeeme.backend.domain.common.ReportSource;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CouponIssueReportRequest {
    private Long couponId;
    private String reason;
    private String detail;
    private ReportSource source; // "AI" | "USER"(생략 시 USER)
}
