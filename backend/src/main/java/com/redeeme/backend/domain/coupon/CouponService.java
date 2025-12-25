package com.redeeme.backend.domain.coupon;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CouponService {
    private final CouponRepository couponRepository;

    @Transactional(readOnly = true)
    public List<CouponResponse> getAllCoupons() {
        return couponRepository.findAll().stream()
                .map(CouponResponse::new)
                .collect(Collectors.toList());
    }
}