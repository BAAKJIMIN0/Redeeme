package com.redeeme.backend.domain.inquiry;

import java.util.List;

import com.redeeme.backend.domain.inquiry.dto.InquiryRequest;
import com.redeeme.backend.domain.inquiry.dto.InquiryResponse;
import com.redeeme.backend.domain.user.User;
import com.redeeme.backend.domain.user.UserRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class InquiryService {

    private final InquiryRepository inquiryRepository;
    private final UserRepository userRepository;

    @Transactional
    public void createInquiry(Long userId, InquiryRequest dto) {
        User reporter = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 유저입니다: " + userId));

        Inquiry inquiry = new Inquiry();
        inquiry.setReporter(reporter);
        inquiry.setTitle(dto.getTitle());
        inquiry.setContent(dto.getContent());

        inquiryRepository.save(inquiry);
    }

    @Transactional(readOnly = true)
    public List<InquiryResponse> getAllInquiries() {
        return inquiryRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(InquiryResponse::new)
                .toList();
    }

    @Transactional
    public void deleteInquiry(Long id) {
        if (!inquiryRepository.existsById(id)) {
            throw new IllegalArgumentException("존재하지 않는 문의입니다: " + id);
        }
        inquiryRepository.deleteById(id);
    }
}
