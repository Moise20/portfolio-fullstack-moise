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
      title: 'Gym PANAS – Site de gym',
      image: '/assets/images/hero/capture_site_gym_app.PNG', // 📸 Mets ici ta capture
      repoUrl: 'https://github.com/Moise20/gymAppMo-se',
      demoUrl: 'https://gym-panas.netlify.app' // 🌐 lien Netlify live demo 
    },
    {
    title: 'Netflix Clone – Angular App',
    image: '/assets/images/hero/netflix_clone_image_principale.PNG',
    repoUrl: 'https://github.com/Moise20/netflix-clone',
    demoUrl: 'https://streamflix-moise.netlify.app'
  },
    {
      title: 'Site E-commerce Fictif',
      image: '/assets/images/hero/Capture_site_ecommerce_fictif.png',
      repoUrl: 'https://github.com/Moise20/ReactJS-frontend-projetFinal',
      demoUrl: 'https://e-commerce-reactjs-nestjs.netlify.app'

    },
    {
      title: 'LinkedIn Clone',
      image: '/assets/images/hero/image_linkdOut.png',
      repoUrl: 'https://github.com/Moise20/Linkdeen_Blog_projet_React_Native'
      // pas de demoUrl => seul le bouton GitHub s’affichera
    },
    // ➕ ajoute d’autres cartes ici ; l’affichage passera automatiquement à la ligne suivante
  ];

  trackByTitle = (_: number, p: ProjectCard) => p.title;
}
