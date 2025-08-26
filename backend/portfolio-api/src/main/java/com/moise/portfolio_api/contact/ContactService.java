// backend/src/main/java/com/moise/portfolio_api/contact/ContactService.java
package com.moise.portfolio_api.contact;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.moise.portfolio_api.mail.Mailer;

@Service
public class ContactService {

  private final MessageRepository repo;
  private final @Nullable Mailer mailer; // peut être null si non configuré

  public ContactService(MessageRepository repo,
                        @Autowired(required = false) @Nullable Mailer mailer) {
    this.repo = repo;
    this.mailer = mailer;
  }

  @Transactional
  public Message create(MessageDto dto) {
    // mapping comme tu faisais (ou via un helper Message.from(dto))
    Message m = new Message();
    m.setName(dto.name());
    m.setEmail(dto.email());
    m.setMessage(dto.message());

    Message saved = repo.save(m);

    // Email optionnel (ne casse pas si SMTP absent)
    if (mailer != null) {
      try {
        mailer.notifyMe(saved);   // t’envoie un mail à toi
        // mailer.autoAck(saved); // si tu veux envoyer un accusé au contact
      } catch (Exception ex) {
        // on loggue mais on ne bloque pas l’écriture en base
        System.out.println("Mailer error (ignored): " + ex.getMessage());
      }
    }

    return saved;
  }
}
