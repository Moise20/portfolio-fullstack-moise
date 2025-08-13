// src/app/features/skills/skills.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface SkillItem {
  name: string;
}
interface SkillGroup {
  title: string;
  items: SkillItem[];
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.html',
  styleUrls: ['./skills.scss']
})
export class Skills {
  // ✨ Ajoute/supprime une carte en modifiant simplement ce tableau
  groups: SkillGroup[] = [
    {
      title: 'Développement Frontend',
      items: [
        { name: 'HTML' },
        { name: 'CSS' },
        { name: 'JavaScript' },  // CV
        { name: 'Angular' },     // CV
        { name: 'React' },       // CV
        { name: 'Bootstrap' }
      ]
    },
    {
      title: 'Développement Backend',
      items: [
        { name: 'Java' },        // CV
        { name: 'Spring Boot' }, // CV
        { name: 'Node.js' },     // CV
        { name: 'NestJS' },      // CV
        { name: 'ASP.NET' },     // CV
        { name: 'PHP' },         // CV
        { name: 'Laravel' }      // CV
      ]
    },
    {
      title: 'Mobile',
      items: [
        { name: 'Android' },     // CV
        { name: 'React Native' } // CV
      ]
    },
    {
      title: 'Bases de données',
      items: [
        { name: 'SQL Server' },  // CV
        { name: 'PostgreSQL' },  // CV
        { name: 'MySQL' },       // CV
        { name: 'SQLite' },      // CV
        { name: 'MongoDB' }      // CV
      ]
    },
    {
      title: 'Outils & DevOps',
      items: [
        { name: 'Docker' },          // CV
        { name: 'Git' },             // CV
        { name: 'GitLab CI/CD' },    // CV
        { name: 'Postman' },         // CV
        { name: 'SonarQube' },       // CV
        { name: 'AWS' } // CV
      ]
    },

  ];
}
