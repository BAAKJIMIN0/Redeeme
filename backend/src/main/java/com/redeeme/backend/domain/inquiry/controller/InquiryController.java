package com.redeeme.backend.domain.inquiry.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import com.redeeme.backend.domain.inquiry.InquiryService;
import com.redeeme.backend.domain.inquiry.dto.InquiryRequest;
import com.redeeme.backend.domain.inquiry.dto.InquiryResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class InquiryController {

    private final InquiryService inquiryService;

    @PostMapping("/api/inquiries")
    public ResponseEntity<String> createInquiry(
            @AuthenticationPrincipal Long userId,
            @RequestBody InquiryRequest request) {
        inquiryService.createInquiry(userId, request);
        return ResponseEntity.ok("문의가 접수되었습니다.");
    }

    @GetMapping("/api/admin/inquiries")
    public ResponseEntity<List<InquiryResponse>> getInquiries() {
        return ResponseEntity.ok(inquiryService.getAllInquiries());
    }

    @DeleteMapping("/api/admin/inquiries/{id}")
    public ResponseEntity<String> deleteInquiry(@PathVariable Long id) {
        inquiryService.deleteInquiry(id);
        return ResponseEntity.ok("문의가 삭제되었습니다.");
    }
}
