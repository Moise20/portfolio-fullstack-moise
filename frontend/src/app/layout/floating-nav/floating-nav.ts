import { Component, inject, OnDestroy, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';

type SectionId = 'home' | 'about' | 'skills' | 'projects' | 'contact';

@Component({
  selector: 'app-floating-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './floating-nav.html',
  styleUrls: ['./floating-nav.scss'],
})
export class FloatingNav implements  AfterViewInit, OnDestroy {
  private router = inject(Router);
  private doc = inject(DOCUMENT);
  private cdr = inject(ChangeDetectorRef);

  private observer?: IntersectionObserver;

  sections: { id: SectionId; label: string; icon: string }[] = [
    { id: 'home',     label: 'Accueil',      icon: 'home' },
    { id: 'about',    label: 'À propos',     icon: 'user' },
    { id: 'skills',   label: 'Compétences',  icon: 'book' },
    { id: 'projects', label: 'Projets',      icon: 'monitor' },
    { id: 'contact',  label: 'Contact',      icon: 'inbox' },
  ];

  active: SectionId = 'home';



  ngAfterViewInit(): void { this.startObserving(); }

  ngOnDestroy(): void { this.observer?.disconnect(); }

  private startObserving(): void {
    if (!('IntersectionObserver' in this.doc.defaultView!)) return;

    const opts: IntersectionObserverInit = {
      root: null, rootMargin: '-45% 0px -45% 0px', threshold: 0,
    };

    const nodes = this.sections
      .map(s => this.doc.getElementById(s.id))
      .filter(Boolean) as HTMLElement[];

    if (nodes.length === 0) { queueMicrotask(() => this.startObserving()); return; }

    this.observer = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          const id = (e.target as HTMLElement).id as SectionId;
          if (id && id !== this.active) { this.active = id; this.cdr.markForCheck(); }
        }
      }
    }, opts);

    nodes.forEach(n => this.observer!.observe(n));
  }

  async go(id: SectionId): Promise<void> {
    const onRoot = this.router.url.split('#')[0] === '/';
    if (!onRoot) { await this.router.navigate(['/'], { fragment: id }); return; }
    const el = this.doc.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
