package com.redeeme.backend.domain.event;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GameEventReportRepository extends JpaRepository<GameEventReport, Long> {
    List<GameEventReport> findAllByOrderByCreatedAtDesc();
}
