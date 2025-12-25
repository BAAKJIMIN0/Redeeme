package com.redeeme.backend;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/api/test")
    public Map<String, String> test() {
        // 리액트에게 보내줄 데이터
        return Map.of("status", "success", "message", "스프링 부트 연결 성공!");
    }
}