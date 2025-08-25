package com.moise.portfolio_api.error;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.*;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<ApiError> handleValidation(MethodArgumentNotValidException ex, HttpServletRequest req) {
    List<String> errs = ex.getBindingResult().getFieldErrors().stream()
      .map(e -> e.getField() + ": " + e.getDefaultMessage())
      .toList();
    ApiError body = ApiError.of(400, "Bad Request", "Validation failed", req.getRequestURI(), errs);
    return ResponseEntity.badRequest().body(body);
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<ApiError> handleGeneric(Exception ex, HttpServletRequest req) {
    ApiError body = ApiError.of(500, "Internal Server Error", ex.getMessage(), req.getRequestURI(), null);
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(body);
  }
}