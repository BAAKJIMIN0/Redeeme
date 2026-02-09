package com.redeeme.backend.domain.coupon.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.redeeme.backend.domain.coupon.dto.AdminCouponCreateRequest;
import com.redeeme.backend.domain.coupon.AdminCouponService;

@RestController
@RequestMapping("api/admin")
@RequiredArgsConstructor
public class AdminCouponController {
    private final AdminCouponService adminCouponService;

    @PostMapping("/coupon-create")
    public ResponseEntity<String> createCoupon(@RequestBody AdminCouponCreateRequest request) {
        adminCouponService.saveCoupon(request);
        return ResponseEntity.ok("쿠폰 등록이 완료되었습니다.");
    }

    @PutMapping("/coupons/{id}")
    public ResponseEntity<String> updateCoupon(@PathVariable Long id,
                                                @RequestBody AdminCouponCreateRequest request) {
        adminCouponService.updateCoupon(id, request);
        return ResponseEntity.ok("쿠폰 수정이 완료되었습니다.");
    }

    @DeleteMapping("/coupons/{id}")
    public ResponseEntity<String> deleteCoupon(@PathVariable Long id) {
        adminCouponService.deleteCoupon(id);
        return ResponseEntity.ok("쿠폰 삭제가 완료되었습니다.");
    }
}