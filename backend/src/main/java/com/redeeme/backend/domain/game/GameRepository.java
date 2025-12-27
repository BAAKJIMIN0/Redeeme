package com.redeeme.backend.domain.game;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface GameRepository extends JpaRepository<Game, Long> {
    List<Game> findByActiveTrueOrderByPriorityAsc();
}