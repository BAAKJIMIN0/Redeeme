package com.redeeme.backend.domain.auth;

import java.util.Collections;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.redeeme.backend.config.JwtUtil;
import com.redeeme.backend.domain.auth.dto.LoginResponse;
import com.redeeme.backend.domain.user.User;
import com.redeeme.backend.domain.user.UserOauth;
import com.redeeme.backend.domain.user.UserOauthRepository;
import com.redeeme.backend.domain.user.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final UserOauthRepository userOauthRepository;
    private final JwtUtil jwtUtil;

    @Value("${google.client-id}")
    private String googleClientId;

    @Transactional
    public LoginResponse loginWithGoogle(String idTokenString) {
        GoogleIdToken.Payload payload = verifyGoogleToken(idTokenString);

        String providerUserId = payload.getSubject();
        String email = payload.getEmail();
        String name = (String) payload.get("name");

        UserOauth userOauth = userOauthRepository
                .findByProviderAndProviderUserId("GOOGLE", providerUserId)
                .orElseGet(() -> createNewUser(providerUserId, email, name));

        User user = userOauth.getUser();
        String token = jwtUtil.generateToken(user.getId(), user.getRole());

        return new LoginResponse(token,
                new LoginResponse.UserInfo(user.getId(), user.getNickname(), user.getRole(), userOauth.getEmail()));
    }

    public LoginResponse.UserInfo getUserInfo(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String email = userOauthRepository.findFirstByUserId(userId)
                .map(UserOauth::getEmail)
                .orElse(null);

        return new LoginResponse.UserInfo(user.getId(), user.getNickname(), user.getRole(), email);
    }

    private GoogleIdToken.Payload verifyGoogleToken(String idTokenString) {
        try {
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(
                    new NetHttpTransport(), GsonFactory.getDefaultInstance())
                    .setAudience(Collections.singletonList(googleClientId))
                    .build();

            GoogleIdToken idToken = verifier.verify(idTokenString);
            if (idToken == null) {
                throw new RuntimeException("Invalid Google ID token");
            }
            return idToken.getPayload();
        } catch (Exception e) {
            throw new RuntimeException("Failed to verify Google ID token", e);
        }
    }

    private UserOauth createNewUser(String providerUserId, String email, String name) {
        User user = new User();
        user.setNickname(email);
        user.setRole("USER");
        userRepository.save(user);

        UserOauth userOauth = new UserOauth();
        userOauth.setUser(user);
        userOauth.setProvider("GOOGLE");
        userOauth.setProviderUserId(providerUserId);
        userOauth.setEmail(email);
        userOauthRepository.save(userOauth);

        return userOauth;
    }
}
