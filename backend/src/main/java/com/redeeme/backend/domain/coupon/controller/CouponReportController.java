package com.redeeme.backend.domain.coupon.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import com.redeeme.backend.domain.coupon.CouponReportService;
import com.redeeme.backend.domain.coupon.dto.CouponReportRequest;
import com.redeeme.backend.domain.coupon.dto.CouponReportResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class CouponReportController {

    private final CouponReportService couponReportService;

    @PostMapping("/api/coupon-reports")
    public ResponseEntity<String> createReport(
            @AuthenticationPrincipal Long userId,
            @RequestBody CouponReportRequest request) {
        couponReportService.createReport(userId, request);
        return ResponseEntity.ok("쿠폰 제보가 완료되었습니다.");
    }

    @GetMapping("/api/admin/coupon-reports")
    public ResponseEntity<List<CouponReportResponse>> getReports() {
        return ResponseEntity.ok(couponReportService.getAllReports());
    }

    @PostMapping("/api/admin/coupon-reports/{id}/accept")
    public ResponseEntity<String> acceptReport(@PathVariable Long id) {
        couponReportService.acceptReport(id);
        return ResponseEntity.ok("제보가 수락되어 쿠폰으로 등록되었습니다.");
    }

    @DeleteMapping("/api/admin/coupon-reports/{id}")
    public ResponseEntity<String> deleteReport(@PathVariable Long id) {
        couponReportService.deleteReport(id);
        return ResponseEntity.ok("제보가 삭제되었습니다.");
    }
}
