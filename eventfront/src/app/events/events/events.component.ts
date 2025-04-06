import { Component, computed, effect, inject, signal } from '@angular/core';
import { Event } from '../../interfaces/event';
import { EventComponent } from "../../event/event/event.component";
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditEventModalComponent } from '../../edit-event/edit-event-modal/edit-event-modal.component';
import { LoginServiceService } from '../../services/login-service.service';
import { EventServiceService } from '../../services/event-service.service';
import { Succes, SuccesEvent } from '../../interfaces/succes';
import { log } from 'console';
import { Router } from '@angular/router';
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

  constructor(private eventService:EventServiceService,private route :Router) {
    effect(() => {
      this.openCreateModal(this.loginService.create_event());
      console.log('creation..........event');
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
            //console.log(data);
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
         //this.route.navigate(['/events']);
       }
       closeModal(): void {
        this.isModalOpen = false;
        this.loginService.create_event.set(false);
        this.selectedEvent = null;
      }

      UpdateEvent(event:FormData,id:number){
        event.append('_method', 'PATCH');
       console.log(event);
       this.eventService.updateEvent(event,id).subscribe(
        (data)=>{
          console.log(data);
          this.loadEvents();
        }
       )
      }

      DeleteEvent(id:number)
      {
        if (confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) {
          this.eventService.deleteEvent(id).subscribe(
            (res)=>{
              this.loadEvents();
              console.log(res);
            }
          )
        }
      }

      saveEvent(eventData: FormData): void {
        eventData.append('_method', 'POST');
        console.log(eventData);
        this.eventService.saveEvent(eventData).subscribe(
          (data)=>{
            console.log(data);
            this.loadEvents();
          }
        )

      }
}
