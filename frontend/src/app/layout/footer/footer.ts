import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.html',
  styleUrls: ['./footer.scss'] // ✅ styleUrls au pluriel
})
export class Footer {
  currentYear: number; // propriété pour stocker l'année courante

  constructor() {
    this.currentYear = new Date().getFullYear(); // calcul dans le TS
  }
}
