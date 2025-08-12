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
  intro = `Bonjour ! Je m'appelle Moïse, je suis un développeur Web Full Stack
  passionné par les nouvelles technologies. Actuellement en formation,
  je poursuis un parcours Angular + Spring Boot pour créer des applis
  performantes et maintenables.

  Mon objectif : devenir expert en développement full-stack et contribuer à des
  projets ambitieux, notamment dans le domaine de l’IA.`;
}
