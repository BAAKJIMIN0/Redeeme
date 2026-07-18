package com.redeeme.backend.domain.event;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GameEventRepository extends JpaRepository<GameEvent, Long> {
    List<GameEvent> findByEventDateBetweenOrderByEventDateAscEventTimeAsc(LocalDate from, LocalDate to);
}
