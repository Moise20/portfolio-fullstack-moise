package com.moise.portfolio_api.contact;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin // CORS géré globalement (voir CorsConfig)
public class ContactController {
  private final ContactService service;
  private final MessageRepository repo;

  public ContactController(ContactService service, MessageRepository repo) {
    this.service = service; this.repo = repo;
  }

  // Public: formulaire
  @PostMapping("/contact")
  public Message create(@Valid @RequestBody MessageDto dto) {
    return service.create(dto);
  }

  // Admin: liste
  @GetMapping("/admin/messages")
  public List<Message> list() { return repo.findAll(); }

  // Admin: marquer répondu
  @PatchMapping("/admin/messages/{id}/reply")
  public Message markReplied(@PathVariable Long id) {
    Message m = repo.findById(id).orElseThrow();
    m.setStatus(Message.Status.REPLIED);
    m.setRepliedAt(java.time.Instant.now());
    return repo.save(m);
  }
}
