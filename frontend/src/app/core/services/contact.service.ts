// src/app/core/services/contact.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface ContactDto { name: string; email: string; message: string; }

export interface Message {
  id: number;
  name: string;
  email: string;
  message: string;
  status: 'NEW' | 'REPLIED';
  createdAt: string;
  repliedAt?: string | null;
}

@Injectable({ providedIn: 'root' })
export class ContactService {
  private http = inject(HttpClient);
  private base = environment.apiBaseUrl;

  create(dto: ContactDto): Observable<Message> {
    return this.http.post<Message>(`${this.base}/contact`, dto);
  }
}
