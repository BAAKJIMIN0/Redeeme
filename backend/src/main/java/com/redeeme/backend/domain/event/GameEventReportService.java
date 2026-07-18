package com.redeeme.backend.domain.event;

import java.util.List;

import com.redeeme.backend.domain.event.dto.GameEventReportRequest;
import com.redeeme.backend.domain.event.dto.GameEventReportResponse;
import com.redeeme.backend.domain.game.Game;
import com.redeeme.backend.domain.game.GameRepository;
import com.redeeme.backend.domain.user.User;
import com.redeeme.backend.domain.user.UserRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class GameEventReportService {

    private final GameEventReportRepository gameEventReportRepository;
    private final GameEventRepository gameEventRepository;
    private final GameRepository gameRepository;
    private final UserRepository userRepository;

    @Transactional
    public void createReport(Long reporterId, GameEventReportRequest dto) {
        User reporter = userRepository.findById(reporterId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 유저입니다: " + reporterId));

        GameEventReport report = new GameEventReport();
        report.setReporter(reporter);

        if (dto.getGameId() != null && dto.getGameId() > 0) {
            Game game = gameRepository.findById(dto.getGameId())
                    .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 게임 ID입니다: " + dto.getGameId()));
            report.setGame(game);
        }

        report.setKorName(dto.getKorName());
        report.setTitle(dto.getTitle());
        report.setDescription(dto.getDescription());
        report.setEventDate(dto.getEventDate());
        report.setEventTime(dto.getEventTime());
        report.setLink(dto.getLink());

        gameEventReportRepository.save(report);
    }

    @Transactional(readOnly = true)
    public List<GameEventReportResponse> getAllReports() {
        return gameEventReportRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(GameEventReportResponse::new)
                .toList();
    }

    @Transactional
    public void acceptReport(Long reportId) {
        GameEventReport report = gameEventReportRepository.findById(reportId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 제보입니다: " + reportId));

        if (report.getGame() == null) {
            throw new IllegalArgumentException("기타 게임 제보는 직접 일정을 등록해주세요.");
        }

        GameEvent event = new GameEvent();
        event.setGame(report.getGame());
        event.setTitle(report.getTitle());
        event.setDescription(report.getDescription());
        event.setEventDate(report.getEventDate());
        event.setEventTime(report.getEventTime());
        event.setLink(report.getLink());

        gameEventRepository.save(event);
        gameEventReportRepository.delete(report);
    }

    @Transactional
    public void deleteReport(Long reportId) {
        if (!gameEventReportRepository.existsById(reportId)) {
            throw new IllegalArgumentException("존재하지 않는 제보입니다: " + reportId);
        }
        gameEventReportRepository.deleteById(reportId);
    }
}
