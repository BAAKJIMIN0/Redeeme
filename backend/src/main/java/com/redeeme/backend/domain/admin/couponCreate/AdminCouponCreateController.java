package com.redeeme.backend.domain.admin.couponCreate;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/admin")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")

public class AdminCouponCreateController {
    private final AdminCouponService adminCouponService;

    @PostMapping("/coupon-create")
    public ResponseEntity<String> createCoupon(@RequestBody AdminCouponCreateDto request) {
        adminCouponService.saveCoupon(request);
        return ResponseEntity.ok("쿠폰 등록이 완료되었습니다.");
    }
}
