package com.redeeme.backend.domain.user;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserOauthRepository extends JpaRepository<UserOauth, Long> {
    Optional<UserOauth> findByProviderAndProviderUserId(String provider, String providerUserId);
    Optional<UserOauth> findFirstByUserId(Long userId);
}
