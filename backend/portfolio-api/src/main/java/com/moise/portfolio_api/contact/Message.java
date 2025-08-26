package com.moise.portfolio_api.contact;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.Instant;

@Entity @Table(name="messages")
public class Message {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank @Size(min=2, max=120)
  private String name;

  @Email @NotBlank @Size(max=180)
  private String email;

  @NotBlank @Size(min=10, max=5000)
  @Column(length = 5000)
  private String message;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private Status status = Status.NEW;

  @Column(nullable = false, updatable = false)
  private Instant createdAt = Instant.now();

  private Instant repliedAt;

  public enum Status { NEW, REPLIED, ARCHIVED }

  // getters/setters (génère avec VS Code si tu veux)
  public Long getId() { return id; }
  public void setId(Long id) { this.id = id; }
  public String getName() { return name; }
  public void setName(String name) { this.name = name; }
  public String getEmail() { return email; }
  public void setEmail(String email) { this.email = email; }
  public String getMessage() { return message; }
  public void setMessage(String message) { this.message = message; }
  public Status getStatus() { return status; }
  public void setStatus(Status status) { this.status = status; }
  public Instant getCreatedAt() { return createdAt; }
  public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
  public Instant getRepliedAt() { return repliedAt; }
  public void setRepliedAt(Instant repliedAt) { this.repliedAt = repliedAt; }
}
