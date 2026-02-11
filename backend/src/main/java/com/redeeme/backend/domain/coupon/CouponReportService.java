package com.redeeme.backend.domain.coupon;

import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.redeeme.backend.domain.coupon.dto.CouponReportRequest;
import com.redeeme.backend.domain.coupon.dto.CouponReportResponse;
import com.redeeme.backend.domain.game.Game;
import com.redeeme.backend.domain.game.GameRepository;
import com.redeeme.backend.domain.user.User;
import com.redeeme.backend.domain.user.UserRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CouponReportService {

    private final CouponReportRepository couponReportRepository;
    private final CouponRepository couponRepository;
    private final GameRepository gameRepository;
    private final UserRepository userRepository;
    private final ObjectMapper objectMapper;

    @Transactional
    public void createReport(Long reporterId, CouponReportRequest dto) {
        User reporter = userRepository.findById(reporterId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 유저입니다: " + reporterId));

        CouponReport report = new CouponReport();
        report.setReporter(reporter);

        if (dto.getGameId() != null && dto.getGameId() > 0) {
            Game game = gameRepository.findById(dto.getGameId())
                    .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 게임 ID입니다: " + dto.getGameId()));
            report.setGame(game);
        }

        report.setKorName(dto.getKorName());
        report.setServer(dto.getServer());
        report.setCode(dto.getCode());
        report.setDescription(dto.getDescription());
        report.setRewards(objectMapper.valueToTree(dto.getRewards()));
        report.setStartedAt(dto.getStartedAt());
        report.setExpiredAt(dto.getExpiredAt());
        report.setQuickUrl(dto.getQuickUrl());

        couponReportRepository.save(report);
    }

    @Transactional(readOnly = true)
    public List<CouponReportResponse> getAllReports() {
        return couponReportRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(CouponReportResponse::new)
                .toList();
    }

    @Transactional
    public void acceptReport(Long reportId) {
        CouponReport report = couponReportRepository.findById(reportId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 제보입니다: " + reportId));

        if (report.getGame() == null) {
            throw new IllegalArgumentException("기타 게임 제보는 직접 쿠폰을 생성해주세요.");
        }

        Coupon coupon = new Coupon();
        coupon.setGame(report.getGame());
        coupon.setCode(report.getCode());
        coupon.setDescription(report.getDescription());
        coupon.setServer(report.getServer());
        coupon.setRewards(report.getRewards());
        coupon.setStartedAt(report.getStartedAt());
        coupon.setExpiredAt(report.getExpiredAt());
        coupon.setQuickUrl(report.getQuickUrl());
        coupon.setActive(true);

        couponRepository.save(coupon);
        couponReportRepository.delete(report);
    }

    @Transactional
    public void deleteReport(Long reportId) {
        if (!couponReportRepository.existsById(reportId)) {
            throw new IllegalArgumentException("존재하지 않는 제보입니다: " + reportId);
        }
        couponReportRepository.deleteById(reportId);
    }
}
