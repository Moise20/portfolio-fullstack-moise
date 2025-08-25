package com.moise.portfolio_api.error;

import java.time.Instant;
import java.util.List;

public record ApiError(
  Instant timestamp,
  int status,
  String error,
  String message,
  String path,
  List<String> validationErrors
) { public static ApiError of(int status, String error, String message, String path, List<String> v){
      return new ApiError(Instant.now(), status, error, message, path, v);
    }
}