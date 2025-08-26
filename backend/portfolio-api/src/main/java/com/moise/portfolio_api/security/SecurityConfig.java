package com.moise.portfolio_api.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;


@Configuration
public class SecurityConfig {

  @Bean
  SecurityFilterChain filter(HttpSecurity http) throws Exception {
    http
      .csrf(csrf -> csrf.disable()) // API
      .headers(h -> h.frameOptions(f -> f.sameOrigin())) // H2
      .authorizeHttpRequests(auth -> auth
        .requestMatchers("/api/contact").permitAll()
        .requestMatchers("/h2-console/**").permitAll()
        .requestMatchers("/api/admin/**").hasRole("ADMIN")
        .anyRequest().permitAll()
      )
      .httpBasic(Customizer.withDefaults());
    return http.build();
  }

  @Bean
  UserDetailsService uds(PasswordEncoder pe) {
    // passe en variables d'env en prod (voir application.yml ci-dessous)
    String user = System.getenv().getOrDefault("ADMIN_USER", "admin");
    String pass = System.getenv().getOrDefault("ADMIN_PASS", "change-me");
    var u = User.withUsername(user).password(pe.encode(pass)).roles("ADMIN").build();
    return new InMemoryUserDetailsManager(u);
  }

  @Bean PasswordEncoder passwordEncoder() { return new BCryptPasswordEncoder(); }
}
