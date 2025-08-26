package com.moise.portfolio_api.contact;
import jakarta.validation.constraints.*;

public record MessageDto(
  @NotBlank @Size(min=2, max=120) String name,
  @Email @NotBlank @Size(max=180) String email,
  @NotBlank @Size(min=10, max=5000) String message
) {}
