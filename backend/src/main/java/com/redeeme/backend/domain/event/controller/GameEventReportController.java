package com.redeeme.backend.domain.event.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import com.redeeme.backend.domain.event.GameEventReportService;
import com.redeeme.backend.domain.event.dto.GameEventReportRequest;
import com.redeeme.backend.domain.event.dto.GameEventReportResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class GameEventReportController {

    private final GameEventReportService gameEventReportService;

    @PostMapping("/api/event-reports")
    public ResponseEntity<String> createReport(
            @AuthenticationPrincipal Long userId,
            @RequestBody GameEventReportRequest request) {
        gameEventReportService.createReport(userId, request);
        return ResponseEntity.ok("공방 일정 제보가 완료되었습니다.");
    }

    @GetMapping("/api/admin/event-reports")
    public ResponseEntity<List<GameEventReportResponse>> getReports() {
        return ResponseEntity.ok(gameEventReportService.getAllReports());
    }

    @PostMapping("/api/admin/event-reports/{id}/accept")
    public ResponseEntity<String> acceptReport(@PathVariable Long id) {
        gameEventReportService.acceptReport(id);
        return ResponseEntity.ok("제보가 수락되어 일정으로 등록되었습니다.");
    }

    @DeleteMapping("/api/admin/event-reports/{id}")
    public ResponseEntity<String> deleteReport(@PathVariable Long id) {
        gameEventReportService.deleteReport(id);
        return ResponseEntity.ok("제보가 삭제되었습니다.");
    }
}
