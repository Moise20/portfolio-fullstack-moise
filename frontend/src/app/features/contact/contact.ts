import { Component, DestroyRef, inject, ChangeDetectorRef, ViewRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ContactService } from '../../core/services/contact.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.scss']
})
export class Contact {
  email = 'panaessognim@gmail.com';
  phoneIntl = '+33669205864';

  private fb = inject(FormBuilder);
  private api = inject(ContactService);
  private destroyRef = inject(DestroyRef);
  private cdr = inject(ChangeDetectorRef);         // ✅ pour forcer la màj

  loading = false;
  successMsg = '';                                  // ✅ message succès
  errorMsg = '';                                    // ✅ message erreur

  private successTimeoutId?: number;                // ✅ ids timeout
  private errorTimeoutId?: number;
  private destroyed = false;

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  constructor() {
    this.destroyRef.onDestroy(() => {
      this.destroyed = true;
      clearTimeout(this.successTimeoutId);
      clearTimeout(this.errorTimeoutId);
    });
  }

  get f() { return this.form.controls; }

  get whatsappHref(): string {
    const text = encodeURIComponent('Bonjour Moïse, je souhaite échanger avec vous à propos de…');
    return `https://wa.me/${this.phoneIntl.replace(/\D/g, '')}?text=${text}`;
  }

  /** Affiche un message de succès puis le masque après ms (par défaut 5s) */
  private flashSuccess(msg = 'Merci ! Votre message a été envoyé ✅', ms = 5000) {
  this.successMsg = msg;
  this.cdr.markForCheck();
  clearTimeout(this.successTimeoutId);

  this.successTimeoutId = window.setTimeout(() => {
    this.successMsg = '';

    // ✅ Ne tente detectChanges que si la vue est encore vivante
    const viewRef = this.cdr as unknown as ViewRef;
    if (!this.destroyed && !viewRef.destroyed) {
      this.cdr.detectChanges();
    }
  }, ms);
}

  /** Affiche un message d’erreur puis le masque après ms (par défaut 5s) */
  private flashError(msg: string, ms = 5000) {
  this.errorMsg = msg;
  this.cdr.markForCheck();
  clearTimeout(this.errorTimeoutId);

  this.errorTimeoutId = window.setTimeout(() => {
    this.errorMsg = '';

    const viewRef = this.cdr as unknown as ViewRef;
    if (!this.destroyed && !viewRef.destroyed) {
      this.cdr.detectChanges();
    }
  }, ms);
}

  onSubmit(): void {
    if (this.form.invalid || this.loading) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.successMsg = '';
    this.errorMsg = '';

    const dto = this.form.getRawValue();

    this.api.create(dto).subscribe({
      next: () => {
        this.loading = false;
        this.form.reset({ name: '', email: '', message: '' });
        this.flashSuccess();                        // ✅ s’auto-cache après 5s
      },
      error: (err: unknown) => {
        this.loading = false;
        let msg = 'Une erreur est survenue. Réessayez.';
        if (err instanceof HttpErrorResponse) {
          msg = err.error?.message || msg;
        }
        this.flashError(msg);                       // ✅ s’auto-cache après 5s
        console.error('Contact error', err);
      }
    });
  }
}
