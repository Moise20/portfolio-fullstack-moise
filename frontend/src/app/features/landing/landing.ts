import { Component } from '@angular/core';
import { Home } from '../home/home';
import { About } from '../about/about';
import { Skills } from '../skills/skills';
import { Projects } from '../projects/projects';
import { Contact } from '../contact/contact';

@Component({
  selector: 'app-landing',
  imports: [Home, About, Skills, Projects, Contact],
  templateUrl: './landing.html',
  styleUrl: './landing.scss'
})
export class Landing {

}
