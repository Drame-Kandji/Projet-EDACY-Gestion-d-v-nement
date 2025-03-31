import { Component, computed, effect, inject } from '@angular/core';
import { Event } from '../../interfaces/event';
import { EventComponent } from "../../event/event/event.component";
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditEventModalComponent } from '../../edit-event/edit-event-modal/edit-event-modal.component';
import { LoginServiceService } from '../../services/login-service.service';
@Component({
  selector: 'app-events',
  imports: [EventComponent, NgIf, NgClass, NgFor, FormsModule, EditEventModalComponent],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent {
  featuredEvents: Event[] = [];
  upcomingEvents: Event[] = [];
  categories: string[] = ['Tous', 'Conférence', 'Concert', 'Atelier', 'Exposition', 'Sport'];
  selectedCategory: string = 'Tous';
  searchTerm: string = '';
  service=inject(LoginServiceService);
  isModalOpen = false;
  selectedEvent: Event | null = null;

  response = computed(() => {
    return this.service.create_event();
   });

  constructor() {
    effect(() => {
      this.openCreateModal(this.response());
      console.log('creation..........');
    });
  }

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
           description:'Conférence Technologie Web 2025Conférence Technologie Web 2025',
           heure:'15',
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

       openCreateModal(response:boolean): void {
         this.selectedEvent = null;
         this.isModalOpen = response;
       }
       closeModal(): void {
        this.isModalOpen = false;
        this.service.create_event.set(false);
        this.selectedEvent = null;
      }

      saveEvent(eventData: Event): void {
        console.log(eventData);

        /* if (eventData.id) {
          // Mise à jour d'un événement existant
          const index = this.events.findIndex(e => e.id === eventData.id);
          if (index !== -1) {
            this.events[index] = eventData;
          }
        } else {
          // Création d'un nouvel événement
          const newId = Math.max(...this.events.map(e => e.id), 0) + 1;
          this.events.push({ ...eventData, id: newId });
        }*/

      }
}
