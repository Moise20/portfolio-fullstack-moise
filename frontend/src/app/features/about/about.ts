// src/app/features/about/about.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';      // *ngFor / *ngIf
import { RouterLink } from '@angular/router';        // routerLink vers /contact
import { Diploma } from '../../core/models/diploma.model';


@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './about.html',
  styleUrls: ['./about.scss']
})
export class About {
  // 🧱 Données affichées dans les cartes (ajoute/enlève des items librement)
  diplomas: Diploma[] = [
    {
      title: 'Développeur Web et Mobile',
      line1: 'Formation 2 ans',
      line2: 'ESTIAM',
      icon: '🎓'
    },
    {
      title: 'Data & Application Development',
      line1: 'Titre de niveau Bac +3',
      line2: 'ESTIAM',
      icon: '🎓'
    },
    {
      title: 'Licence en Génie logiciel',
      line1: 'Titre de niveau Bac +3',
      line2: 'IAI Togo',
      icon: '🎓'
    }
  ];

  // ✍️ Texte de présentation (modifie comme tu veux)
  intro = `Bonjour ! Je m’appelle Moïse. Ingénieur logiciel, titulaire d’un Master en Développement Web & Mobile, spécialisé en Angular + Spring Boot.
Je conçois des applications web et mobiles (Android/iOS) robustes, testées et prêtes pour la production, avec automatisation CI/CD (Docker, GitLab CI/CD, PostgreSQL), en tirant parti des services AWS selon les besoins (EC2, Lambda, S3, RDS, CloudFront, CloudFormation).
Ma spécialité : transformer un besoin métier en produit simple, rapide et maintenable.
Si vous recherchez un ingénieur capable de livrer en production et de collaborer efficacement avec les équipes Design, Data et Ops, prenons contact.`;

}
