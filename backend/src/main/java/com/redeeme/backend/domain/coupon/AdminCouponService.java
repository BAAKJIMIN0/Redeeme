package com.redeeme.backend.domain.coupon;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.redeeme.backend.domain.coupon.dto.AdminCouponCreateRequest;
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
    private final ObjectMapper objectMapper;

    @Transactional
    public void saveCoupon(AdminCouponCreateRequest dto) {
        Game game = gameRepository.findById(dto.getGameId())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 게임 ID입니다: " + dto.getGameId()));
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
        couponRepository.save(coupon);
    }
}