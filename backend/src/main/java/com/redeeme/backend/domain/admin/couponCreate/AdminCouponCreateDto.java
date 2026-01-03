package com.redeeme.backend.domain.admin.couponCreate;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class AdminCouponCreateDto {
    private String code;
    private String description;
    private Long gameId;
    private String korName;
    private String quickUrl;
    private List<Map<String, Object>> rewards;
    private String server;
    private LocalDate startedAt;
    private LocalDate expiredAt;
}