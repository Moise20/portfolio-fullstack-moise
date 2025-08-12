// src/app/features/contact/contact.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  // ✅ Standalone => on importe ici ce dont on a besoin
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.scss'] // ✅ pluriel
})
export class Contact {
  // ⚙️ Config perso
  email = 'panaessognim@gmail.com';      // ⬅️ à remplacer
  phoneIntl = '+33669205864';           // ⬅️ format international (pour WhatsApp)

  // ✅ Injection moderne sans constructeur (satisfait le linter)
  private fb = inject(FormBuilder);


  // 🧠 Reactive Form + validations
  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });



  get f() { return this.form.controls; }

  // 🔗 Lien WhatsApp "click to chat"
  get whatsappHref(): string {
    const text = encodeURIComponent('Bonjour Moïse, je souhaite échanger avec vous à propos de…');
    return `https://wa.me/${this.phoneIntl.replace(/\D/g, '')}?text=${text}`;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      // Marque tout comme "touched" pour afficher les erreurs
      this.form.markAllAsTouched();
      return;
    }
    // 👉 Ici, on enverra au backend (Sprint 2). Pour l’instant, simple log.
    console.log('Contact payload', this.form.getRawValue());
    alert('Merci ! Votre message a bien été préparé (simulation).');
    this.form.reset();
  }
}
