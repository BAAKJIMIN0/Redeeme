package com.redeeme.backend.domain.auth.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class GoogleLoginRequest {
    private String idToken;
}
