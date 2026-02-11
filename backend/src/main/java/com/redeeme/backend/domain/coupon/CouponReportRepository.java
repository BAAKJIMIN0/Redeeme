package com.redeeme.backend.domain.coupon;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CouponReportRepository extends JpaRepository<CouponReport, Long> {
    List<CouponReport> findAllByOrderByCreatedAtDesc();
}
