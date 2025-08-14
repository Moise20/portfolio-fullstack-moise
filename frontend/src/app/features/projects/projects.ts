// src/app/features/projects/projects.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ProjectCard {
  title: string;
  image: string;        // chemin vers une image 16:9
  repoUrl: string;      // lien GitHub
  demoUrl?: string;     // optionnel
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrls: ['./projects.scss']
})
export class Projects {
  // 🧱 Liste des projets (ajoute/supprime ici)
  projects: ProjectCard[] = [
    {
      title: 'Site E-commerce Fictif',
      image: '/assets/images/hero/Capture_site_ecommerce_fictif.png',
      repoUrl: 'https://github.com/Moise20/ReactJS-frontend-projetFinal',

    },
    {
      title: 'LinkdIn Clone',
      image: 'assets/images/projects/twitch-clone.jpg',
      repoUrl: 'https://github.com/Moise20/Linkdeen_Blog_projet_React_Native'
      // pas de demoUrl => seul le bouton GitHub s’affichera
    },
    // ➕ ajoute d’autres cartes ici ; l’affichage passera automatiquement à la ligne suivante
  ];

  trackByTitle = (_: number, p: ProjectCard) => p.title;
}
