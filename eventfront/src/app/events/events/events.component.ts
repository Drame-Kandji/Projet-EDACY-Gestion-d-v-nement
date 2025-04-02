import { Component, computed, effect, inject } from '@angular/core';
import { Event } from '../../interfaces/event';
import { EventComponent } from "../../event/event/event.component";
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditEventModalComponent } from '../../edit-event/edit-event-modal/edit-event-modal.component';
import { LoginServiceService } from '../../services/login-service.service';
import { EventServiceService } from '../../services/event-service.service';
import { Succes } from '../../interfaces/succes';
import { log } from 'console';
@Component({
  selector: 'app-events',
  imports: [EventComponent, NgIf, NgClass, NgFor, FormsModule, EditEventModalComponent],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent {
  allEvents: Event[]=[];
  categories: string[] = ['Tous', 'Conférence', 'Concert', 'Atelier', 'Exposition', 'Sport'];
  selectedCategory: string = 'Tous';
  searchTerm: string = '';
  loginService=inject(LoginServiceService);
  isModalOpen = false;

  selectedEvent: Event | null = null;

  response = computed(() => {
    return this.loginService.create_event();
   });


  constructor(private eventService:EventServiceService) {
    effect(() => {
      this.openCreateModal(this.response());
      console.log('creation..........');
    });
  }

   ngOnInit(): void {
       // données d'événements depuis une API
       this.loadEvents();
     }

     loadEvents(): void {
        //appels API
       this.eventService.getEvents().subscribe(
        (data:Succes)=>{
          if(data.status==200){
            this.allEvents=data.data
            console.log(data);
          }
        }
       )

     }

     filterByCategory(category: string): void {
       this.selectedCategory = category;
     }

     get filteredEvents(): Event[] {
       return this.allEvents.filter(event => {
         // Filtrer par catégorie
         const categoryMatch = this.selectedCategory === 'Tous' || event.category === this.selectedCategory;
         // Filtrer par recherche
         const searchMatch = this.searchTerm === '' ||
           event.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
           event.location.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
           event.category.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
           event.date.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
           event.heure.toLowerCase().includes(this.searchTerm.toLowerCase());
         return categoryMatch && searchMatch;
       });
     }

       openCreateModal(response:boolean): void {
         this.selectedEvent = null;
         this.isModalOpen = response;
       }
       closeModal(): void {
        this.isModalOpen = false;
        this.loginService.create_event.set(false);
        this.selectedEvent = null;
      }

      UpdateEvent(event:Event){
       this.eventService.updateEvent(event).subscribe(
       )
      }

      DeleteEvent(id:number)
      {
        if (confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) {
          this.eventService.deleteEvent(id).subscribe(
            (res)=>{
              console.log(res);
              console.log("Événement supprimé !");
              this.allEvents = this.allEvents.filter(event => event.id !== id);
            }
          )
        }
      }

      saveEvent(eventData: Event): void {
        console.log(eventData);
        this.eventService.saveEvent(eventData).subscribe(
          (data)=>{
            console.log(data);
            this.allEvents.push(eventData);
          }
        )
      }
}
