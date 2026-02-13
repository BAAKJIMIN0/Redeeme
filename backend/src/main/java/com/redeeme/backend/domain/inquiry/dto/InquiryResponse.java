package com.redeeme.backend.domain.inquiry.dto;

import java.time.LocalDateTime;

import com.redeeme.backend.domain.inquiry.Inquiry;

import lombok.Getter;

@Getter
public class InquiryResponse {
    private final Long id;
    private final Long reporterId;
    private final String title;
    private final String content;
    private final LocalDateTime createdAt;

    public InquiryResponse(Inquiry inquiry) {
        this.id = inquiry.getId();
        this.reporterId = inquiry.getReporter().getId();
        this.title = inquiry.getTitle();
        this.content = inquiry.getContent();
        this.createdAt = inquiry.getCreatedAt();
    }
}
