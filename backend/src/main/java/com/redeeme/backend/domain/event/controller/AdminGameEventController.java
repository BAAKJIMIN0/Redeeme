package com.redeeme.backend.domain.event.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.redeeme.backend.domain.event.AdminGameEventService;
import com.redeeme.backend.domain.event.dto.AdminGameEventRequest;

@RestController
@RequestMapping("api/admin/events")
@RequiredArgsConstructor
public class AdminGameEventController {
    private final AdminGameEventService adminGameEventService;

    @PostMapping
    public ResponseEntity<String> createEvent(@RequestBody AdminGameEventRequest request) {
        adminGameEventService.saveEvent(request);
        return ResponseEntity.ok("일정 등록이 완료되었습니다.");
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateEvent(@PathVariable Long id,
                                               @RequestBody AdminGameEventRequest request) {
        adminGameEventService.updateEvent(id, request);
        return ResponseEntity.ok("일정 수정이 완료되었습니다.");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEvent(@PathVariable Long id) {
        adminGameEventService.deleteEvent(id);
        return ResponseEntity.ok("일정 삭제가 완료되었습니다.");
    }
}
