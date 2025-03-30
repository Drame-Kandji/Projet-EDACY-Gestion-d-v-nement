// footer.component.ts
import { NgFor, NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports:[NgSwitch,RouterLink,NgFor,NgSwitchCase],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();

  // Liens de navigation du footer
  footerLinks = [
    {
      title: 'Notre Plateforme',
      links: [
        { name: 'À propos', url: '/about' },
        { name: 'Fonctionnalités', url: '/features' },
        { name: 'Tarifs', url: '/pricing' },
        { name: 'FAQ', url: '/faq' },
      ]
    },
    {
      title: 'Événements',
      links: [
        { name: 'Calendrier', url: '/calendar' },
        { name: 'Catégories', url: '/categories' },
        { name: 'Créer un événement', url: '/create-event' },
        { name: 'Événements populaires', url: '/popular' },
      ]
    },
    {
      title: 'Ressources',
      links: [
        { name: 'Centre d\'aide', url: '/help' },
        { name: 'Blog', url: '/blog' },
        { name: 'Tutoriels', url: '/tutorials' },
        { name: 'Partenaires', url: '/partners' },
      ]
    },
    {
      title: 'Légal',
      links: [
        { name: 'Conditions d\'utilisation', url: '/terms' },
        { name: 'Politique de confidentialité', url: '/privacy' },
        { name: 'Cookies', url: '/cookies' },
        { name: 'Mentions légales', url: '/legal' },
      ]
    }
  ];

  // Réseaux sociaux
  socialLinks = [
    { name: 'Facebook', icon: 'facebook', url: 'https://facebook.com' },
    { name: 'Twitter', icon: 'twitter', url: 'https://twitter.com' },
    { name: 'Instagram', icon: 'instagram', url: 'https://instagram.com' },
    { name: 'LinkedIn', icon: 'linkedin', url: 'https://linkedin.com' }
  ];

  // Pour l'inscription à la newsletter
  subscribeToNewsletter(email: string) {
    console.log('Email inscrit à la newsletter:', email);
    // Implémentez ici votre logique d'inscription à la newsletter
  }
}
