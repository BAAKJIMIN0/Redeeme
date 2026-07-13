package com.redeeme.backend.domain.coupon;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CouponIssueReportRepository extends JpaRepository<CouponIssueReport, Long> {
    List<CouponIssueReport> findAllByOrderByCreatedAtDesc();
    List<CouponIssueReport> findByCouponIdOrderByCreatedAtDesc(Long couponId);
    void deleteByCouponId(Long couponId);

    @Query("SELECT r.coupon.id AS couponId, COUNT(r) AS count FROM CouponIssueReport r GROUP BY r.coupon.id")
    List<CouponIssueReportCount> countGroupedByCoupon();

    interface CouponIssueReportCount {
        Long getCouponId();
        Long getCount();
    }
}
