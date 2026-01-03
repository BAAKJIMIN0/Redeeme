package com.redeeme.backend.domain.admin.couponCreate;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.redeeme.backend.domain.coupon.Coupon;
import com.redeeme.backend.domain.coupon.CouponRepository;
import com.redeeme.backend.domain.game.Game;
import com.redeeme.backend.domain.game.GameRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AdminCouponService {

    private final CouponRepository couponRepository;
    private final GameRepository gameRepository;
    private final ObjectMapper objectMapper; // rewards 변환용

    @Transactional
    public void saveCoupon(AdminCouponCreateDto dto) {
        // 1. gameId로 Game 엔티티 조회
        Game game = gameRepository.findById(dto.getGameId())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 게임 ID입니다: " + dto.getGameId()));

        // 2. 기존 Coupon 엔티티에 값 채우기
        Coupon coupon = new Coupon();
        coupon.setGame(game);
        coupon.setCode(dto.getCode());
        coupon.setDescription(dto.getDescription());
        coupon.setServer(dto.getServer());
        coupon.setRewards(objectMapper.valueToTree(dto.getRewards()));
        coupon.setStartedAt(dto.getStartedAt());
        coupon.setExpiredAt(dto.getExpiredAt());
        coupon.setQuickUrl(dto.getQuickUrl());
        coupon.setActive(true);

        // 3. DB 저장
        couponRepository.save(coupon);
    }
}