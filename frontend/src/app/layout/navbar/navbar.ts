import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // ✅ Import pour routerLink et routerLinkActive

@Component({
  selector: 'app-navbar',
  standalone: true, // ✅ Composant standalone
  imports: [RouterModule], // ✅ Nécessaire pour les directives de routage
  templateUrl: './navbar.html', // ✅ Fichier HTML de ton composant
  styleUrls: ['./navbar.scss'] // ✅ styleUrls (pluriel) et tableau
})
export class Navbar {}
