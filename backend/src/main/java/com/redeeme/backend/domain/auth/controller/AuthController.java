package com.redeeme.backend.domain.auth.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import com.redeeme.backend.domain.auth.AuthService;
import com.redeeme.backend.domain.auth.dto.GoogleLoginRequest;
import com.redeeme.backend.domain.auth.dto.LoginResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/google")
    public ResponseEntity<LoginResponse> googleLogin(@RequestBody GoogleLoginRequest request) {
        LoginResponse response = authService.loginWithGoogle(request.getIdToken());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/me")
    public ResponseEntity<LoginResponse.UserInfo> me(@AuthenticationPrincipal Long userId) {
        LoginResponse.UserInfo userInfo = authService.getUserInfo(userId);
        return ResponseEntity.ok(userInfo);
    }
}
