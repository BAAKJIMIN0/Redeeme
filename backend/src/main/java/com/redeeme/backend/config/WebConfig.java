package com.redeeme.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.lang.NonNull;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addViewControllers(@NonNull ViewControllerRegistry registry) {
        registry.addViewController("/{path:^(?!api|assets|gameIcons|vite\\.svg|index\\.html).*$}")
            .setViewName("forward:/index.html");
        registry.addViewController("/{path:^(?!api|assets|gameIcons|vite\\.svg|index\\.html).*$}/**")
            .setViewName("forward:/index.html");
    }
}