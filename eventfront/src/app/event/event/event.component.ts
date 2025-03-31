import { Component, computed, effect, inject, Input } from '@angular/core';
import { Event } from '../../interfaces/event';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { EditEventModalComponent } from "../../edit-event/edit-event-modal/edit-event-modal.component";
import { LoginServiceService } from '../../services/login-service.service';

@Component({
  selector: 'app-event',
  imports: [RouterLink, RouterLinkActive, EditEventModalComponent],
  templateUrl: './event.component.html',
  styleUrl: './event.component.css'
})
export class EventComponent {
  @Input() event!:Event;
  @Input() description:boolean=true;
  isModalOpen = false;
  selectedEvent: Event | null = null;

  openEditModal(event: Event): void {
    this.selectedEvent = { ...event };
    this.isModalOpen = true;
    console.log('module ouvert');

  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedEvent = null;
  }

  saveEvent(eventData: Event): void {
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
    } */
  }

  deleteEvent(id: number): void {
    /* if (confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) {
      this.events = this.events.filter(e => e.id !== id);
    } */
  }
}
