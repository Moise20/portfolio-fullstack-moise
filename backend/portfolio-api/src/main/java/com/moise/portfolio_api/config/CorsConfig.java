package com.moise.portfolio_api.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.*;

import java.util.List;

@Configuration
public class CorsConfig {
  @Value("${app.cors.allowed-origins:http://localhost:4200}")
  private List<String> allowedOrigins;

  @Bean
  public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration cfg = new CorsConfiguration();
    cfg.setAllowedOrigins(List.of(
      "https://thriving-pixie-ffb547.netlify.app",
      "https://portfolio-fullstack-moise.onrender.com",
      "https://sparkly-salamander-21f217.netlify.app",
      "https://wonderful-bombolone-333898.netlify.app",
      "https://ton-domaine.netlify.app",
      "https://ton-domaine.vercel.app"
      
    ));

    cfg.setAllowedMethods(List.of("GET","POST","PATCH","PUT","DELETE","OPTIONS"));
    cfg.setAllowedHeaders(List.of("*"));
    cfg.setAllowCredentials(true);

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", cfg);
    return source;
  }
}