package com.redeeme.backend.domain.event;

import com.redeeme.backend.domain.event.dto.AdminGameEventRequest;
import com.redeeme.backend.domain.game.Game;
import com.redeeme.backend.domain.game.GameRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AdminGameEventService {

    private final GameEventRepository gameEventRepository;
    private final GameRepository gameRepository;

    @Transactional
    public void saveEvent(AdminGameEventRequest dto) {
        Game game = gameRepository.findById(dto.getGameId())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 게임 ID입니다: " + dto.getGameId()));
        GameEvent event = new GameEvent();
        event.setGame(game);
        event.setTitle(dto.getTitle());
        event.setDescription(dto.getDescription());
        event.setEventDate(dto.getEventDate());
        event.setEventTime(dto.getEventTime());
        event.setLink(dto.getLink());
        gameEventRepository.save(event);
    }

    @Transactional
    public void updateEvent(Long id, AdminGameEventRequest dto) {
        GameEvent event = gameEventRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 일정 ID입니다: " + id));
        Game game = gameRepository.findById(dto.getGameId())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 게임 ID입니다: " + dto.getGameId()));
        event.setGame(game);
        event.setTitle(dto.getTitle());
        event.setDescription(dto.getDescription());
        event.setEventDate(dto.getEventDate());
        event.setEventTime(dto.getEventTime());
        event.setLink(dto.getLink());
    }

    @Transactional
    public void deleteEvent(Long id) {
        if (!gameEventRepository.existsById(id)) {
            throw new IllegalArgumentException("존재하지 않는 일정 ID입니다: " + id);
        }
        gameEventRepository.deleteById(id);
    }
}
