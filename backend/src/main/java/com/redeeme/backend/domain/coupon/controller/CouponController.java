package com.redeeme.backend.domain.coupon.controller;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;

import com.redeeme.backend.domain.coupon.CouponService;
import com.redeeme.backend.domain.coupon.dto.CouponResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/coupons")
@RequiredArgsConstructor
public class CouponController {
    private final CouponService couponService;

    @GetMapping
    public List<CouponResponse> getCoupons(
            @RequestParam(name = "gameIds", required = false) List<Long> gameIds) {
        return couponService.getCoupons(gameIds);
    }
}