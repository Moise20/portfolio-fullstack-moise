import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ NgFor est ici
import skillsData from '../../../assets/mocks/skills.json';

@Component({
  selector: 'app-skills',
  standalone: true, // ✅ important
  imports: [CommonModule], // ✅ pour *ngFor
  templateUrl: './skills.html',
  styleUrl: './skills.scss'
})
export class Skills  {
  frontendSkills = skillsData.frontend;
  backendSkills = skillsData.backend;


}
