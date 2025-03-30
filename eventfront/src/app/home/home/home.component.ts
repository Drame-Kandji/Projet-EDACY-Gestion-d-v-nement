// home.component.ts
import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Event } from '../../interfaces/event';
import { EventComponent } from "../../event/event/event.component";

@Component({
  selector: 'app-home',
  imports: [NgFor, NgClass, FormsModule, NgIf, EventComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  featuredEvents: Event[] = [];
  upcomingEvents: Event[] = [];
  categories: string[] = ['Tous', 'Conférence', 'Concert', 'Atelier', 'Exposition', 'Sport'];
  selectedCategory: string = 'Tous';
  searchTerm: string = '';

  constructor() { }

  ngOnInit(): void {
    // Simuler des données d'événements depuis une API
    this.loadEvents();
  }

  loadEvents(): void {
    // Données fictives - à remplacer par des appels API réels
    const allEvents: Event[] = [
      {
        id: 1,
        title: 'Conférence Technologie Web 2025',
        date: '15 Avril 2025',
        location: 'Paris Expo Porte de Versailles',
        image: 'https://www.brgm.fr/sites/default/files/images/2020-08/evenement-mining-indaba-2020-001.jpg',
        category: 'Conférence',
        attendees: 1250,
      },
      {
        id: 2,
        title: 'Festival de musique électronique',
        date: '22-24 Mai 2025',
        location: 'Parc des Expositions',
        image: 'https://mister-riviera.com/wp-content/uploads/2023/05/Festivals-sur-la-cote-d-azur-blog-mister-riviera-sortir-a-nice-cannes-monaco-soiree-evenement-french-riviera-influenceur.png',
        category: 'Concert',
        attendees: 5000,
      },
      {
        id: 3,
        title: 'Atelier de photographie',
        date: '10 Avril 2025',
        location: 'Studio Lumière',
        image: 'https://force-n.sn/sites/default/files/services/force-n-services-promo-sciences.webp',
        category: 'Atelier',
        attendees: 45
      },
      {
        id: 4,
        title: 'Exposition d\'art contemporain',
        date: '1-30 Avril 2025',
        location: 'Galerie Moderne',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlPzsXwMkEtf9xntHvC4cDHtJV-mGCcCYEDw&s',
        category: 'Exposition',
        attendees: 890
      },
      {
        id: 5,
        title: 'Marathon de Paris',
        date: '12 Avril 2025',
        location: 'Champs-Élysées',
        image: 'https://demarchesadministratives.fr/images/demarches/308/manifestation-sportive.jpg',
        category: 'Sport',
        attendees: 25000
      },
      {
        id: 6,
        title: 'Séminaire Marketing Digital',
        date: '20 Avril 2025',
        location: 'Centre de Conférences',
        image: 'https://simsenegal.com/wp-content/uploads/2024/09/DSC03127-scaled-400x400.jpg',
        category: 'Conférence',
        attendees: 350
      },

    ];

    // Filtrage des événements
    this.upcomingEvents = allEvents.sort((a, b) =>
      new Date(a.date.split(' ')[0] + ' 2025').getTime() -
      new Date(b.date.split(' ')[0] + ' 2025').getTime()
    );
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;
  }

  get filteredEvents(): Event[] {
    return this.upcomingEvents.filter(event => {
      // Filtrer par catégorie
      const categoryMatch = this.selectedCategory === 'Tous' || event.category === this.selectedCategory;

      // Filtrer par recherche
      const searchMatch = this.searchTerm === '' ||
        event.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(this.searchTerm.toLowerCase());

      return categoryMatch && searchMatch;
    });
  }
}
