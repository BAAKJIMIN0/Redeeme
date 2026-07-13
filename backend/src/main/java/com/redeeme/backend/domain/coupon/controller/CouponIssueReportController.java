package com.redeeme.backend.domain.coupon.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import com.redeeme.backend.domain.coupon.CouponIssueReportService;
import com.redeeme.backend.domain.coupon.dto.CouponIssueReportRequest;
import com.redeeme.backend.domain.coupon.dto.CouponIssueReportResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class CouponIssueReportController {

    private final CouponIssueReportService couponIssueReportService;

    @PostMapping("/api/coupon-issue-reports")
    public ResponseEntity<String> createReport(
            @AuthenticationPrincipal Long userId,
            @RequestBody CouponIssueReportRequest request) {
        couponIssueReportService.createReport(userId, request);
        return ResponseEntity.ok("쿠폰 신고가 접수되었습니다.");
    }

    @GetMapping("/api/admin/coupon-issue-reports")
    public ResponseEntity<List<CouponIssueReportResponse>> getReports(
            @RequestParam(required = false) Long couponId) {
        return ResponseEntity.ok(couponIssueReportService.getAllReports(couponId));
    }

    @GetMapping("/api/admin/coupon-issue-reports/counts")
    public ResponseEntity<Map<Long, Long>> getReportCounts() {
        return ResponseEntity.ok(couponIssueReportService.getReportCounts());
    }

    @DeleteMapping("/api/admin/coupon-issue-reports/{id}")
    public ResponseEntity<String> deleteReport(@PathVariable Long id) {
        couponIssueReportService.deleteReport(id);
        return ResponseEntity.ok("신고가 삭제되었습니다.");
    }
}
