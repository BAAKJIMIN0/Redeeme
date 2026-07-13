package com.redeeme.backend.domain.coupon;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.redeeme.backend.domain.coupon.dto.CouponIssueReportRequest;
import com.redeeme.backend.domain.coupon.dto.CouponIssueReportResponse;
import com.redeeme.backend.domain.user.User;
import com.redeeme.backend.domain.user.UserRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CouponIssueReportService {

    private final CouponIssueReportRepository couponIssueReportRepository;
    private final CouponRepository couponRepository;
    private final UserRepository userRepository;

    @Transactional
    public void createReport(Long reporterId, CouponIssueReportRequest dto) {
        User reporter = userRepository.findById(reporterId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 유저입니다: " + reporterId));
        Coupon coupon = couponRepository.findById(dto.getCouponId())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 쿠폰입니다: " + dto.getCouponId()));

        CouponIssueReport report = new CouponIssueReport();
        report.setReporter(reporter);
        report.setCoupon(coupon);
        report.setReason(dto.getReason());
        report.setDetail(dto.getDetail());

        couponIssueReportRepository.save(report);
    }

    @Transactional(readOnly = true)
    public List<CouponIssueReportResponse> getAllReports(Long couponId) {
        List<CouponIssueReport> reports = couponId != null
                ? couponIssueReportRepository.findByCouponIdOrderByCreatedAtDesc(couponId)
                : couponIssueReportRepository.findAllByOrderByCreatedAtDesc();
        return reports.stream()
                .map(CouponIssueReportResponse::new)
                .toList();
    }

    @Transactional(readOnly = true)
    public Map<Long, Long> getReportCounts() {
        Map<Long, Long> counts = new HashMap<>();
        for (CouponIssueReportRepository.CouponIssueReportCount row : couponIssueReportRepository.countGroupedByCoupon()) {
            counts.put(row.getCouponId(), row.getCount());
        }
        return counts;
    }

    @Transactional
    public void deleteReport(Long id) {
        if (!couponIssueReportRepository.existsById(id)) {
            throw new IllegalArgumentException("존재하지 않는 신고입니다: " + id);
        }
        couponIssueReportRepository.deleteById(id);
    }
}
