// src/app/features/contact/contact.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.scss']
})
export class Contact {
  // ⚙️ Tes infos
  email = 'panaessognim@gmail.com';   // ← ton adresse
  phoneIntl = '+33669205864';         // ← pour WhatsApp

  private fb = inject(FormBuilder);

  // 🧠 Formulaire réactif
  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  get f() { return this.form.controls; }

  // 🔗 Lien WhatsApp
  get whatsappHref(): string {
    const text = encodeURIComponent('Bonjour Moïse, je souhaite échanger avec vous à propos de…');
    return `https://wa.me/${this.phoneIntl.replace(/\D/g, '')}?text=${text}`;
  }

  // ✉️ Version v1: ouvrir le client mail de l'utilisateur avec le message prérempli
  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { name, email, message } = this.form.getRawValue();

    const subject = encodeURIComponent(`Contact portfolio – ${name}`);
    const body = encodeURIComponent(
      `Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\n---\nEnvoyé depuis le portfolio`
    );

    // Ouvre le client mail de l'utilisateur
    window.location.href = `mailto:${encodeURIComponent(this.email)}?subject=${subject}&body=${body}`;

    // Optionnel : réinitialiser le formulaire après le clic
    this.form.reset();
  }
}
