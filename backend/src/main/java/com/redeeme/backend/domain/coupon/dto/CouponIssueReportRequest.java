package com.redeeme.backend.domain.coupon.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CouponIssueReportRequest {
    private Long couponId;
    private String reason;
    private String detail;
}
