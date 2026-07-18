package com.redeeme.backend.domain.event;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.redeeme.backend.domain.event.dto.GameEventResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GameEventService {
    private final GameEventRepository gameEventRepository;

    @Transactional(readOnly = true)
    public List<GameEventResponse> getEvents(LocalDate from, LocalDate to) {
        return gameEventRepository.findByEventDateBetweenOrderByEventDateAscEventTimeAsc(from, to).stream()
                .map(GameEventResponse::new)
                .collect(Collectors.toList());
    }
}
