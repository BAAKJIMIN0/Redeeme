package com.redeeme.backend.domain.coupon;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.redeeme.backend.domain.coupon.dto.CouponResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CouponService {
    private final CouponRepository couponRepository;

    @Transactional(readOnly = true)
    public List<CouponResponse> getCoupons(List<Long> gameIds) {
        List<Coupon> coupons;
        if (gameIds == null || gameIds.isEmpty()) {
            coupons = couponRepository.findAllByOrderByExpiredAtAsc();
        } else {
            coupons = couponRepository.findByGameIdInOrderByExpiredAtAsc(gameIds);
        }

        return coupons.stream()
                .map(CouponResponse::new)
                .collect(Collectors.toList());
    }
}