// backend/src/main/java/com/moise/portfolio_api/mail/Mailer.java
package com.moise.portfolio_api.mail;

import com.moise.portfolio_api.contact.Message;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class Mailer {
  private final JavaMailSender mail;

  /** Expéditeur : pour Gmail, garde ton adresse exacte */
  private final String fromAddress;

  /** Où tu reçois les notifications */
  private final String notifyTo;

  public Mailer(
      JavaMailSender mail,
      @Value("${mail.from:panaessognim2@gmail.com}") String fromAddress,
      @Value("${mail.notify-to:panaessognim@gmail.com}") String notifyTo
  ) {
    this.mail = mail;
    this.fromAddress = fromAddress;
    this.notifyTo = notifyTo;
  }

  /** Notification vers ta boîte (Reply-To = email du contact) */
  public void notifyMe(Message m) {
    SimpleMailMessage msg = new SimpleMailMessage();
    msg.setFrom(fromAddress);
    msg.setTo(notifyTo);
    if (!isBlank(m.getEmail())) msg.setReplyTo(m.getEmail());
    msg.setSubject("[Portfolio] Nouveau message de " + nullSafe(m.getName()));
    msg.setText(
        "Nom: " + nullSafe(m.getName()) + "\n" +
        "Email: " + nullSafe(m.getEmail()) + "\n\n" +
        "Message:\n" + nullSafe(m.getMessage())
    );
    mail.send(msg);
  }

  /** Accusé de réception automatique (facultatif) vers la personne */
  public void autoAck(Message m) {
    if (isBlank(m.getEmail())) return;
    SimpleMailMessage msg = new SimpleMailMessage();
    msg.setFrom(fromAddress);              // ✔ Gmail exige un From “légitime”
    msg.setTo(m.getEmail());
    msg.setSubject("Merci pour votre message");
    msg.setText(String.format(
        "Bonjour %s,\n\nMerci pour votre message ! Je reviens vers vous très vite.\n\n— Moïse",
        nullSafe(m.getName())
    ));
    mail.send(msg);
  }

  /** Réponse manuelle (si tu exposes un endpoint d’admin) */
  public void replyTo(String to, String subject, String content) {
    if (isBlank(to)) return;
    SimpleMailMessage msg = new SimpleMailMessage();
    msg.setFrom(fromAddress);
    msg.setTo(to);
    msg.setSubject(subject == null ? "" : subject);
    msg.setText(content == null ? "" : content);
    mail.send(msg);
  }

  private static boolean isBlank(String s) { return s == null || s.trim().isEmpty(); }
  private static String nullSafe(String s) { return s == null ? "" : s; }
}
