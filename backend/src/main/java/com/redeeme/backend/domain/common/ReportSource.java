package com.redeeme.backend.domain.common;

/**
 * 제보(쿠폰 제보, 쿠폰 문제 신고, 공방 일정 제보)의 출처.
 * AI는 X-Bot-Key 헤더로 봇 키를 검증받은 요청에만 부여된다 — 요청 본문으로는 지정할 수 없다.
 */
public enum ReportSource {
    USER,
    AI
}
