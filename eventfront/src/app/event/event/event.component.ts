import { Component, computed, effect, inject, Input, Output,EventEmitter } from '@angular/core';
import { Event } from '../../interfaces/event';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { EditEventModalComponent } from "../../edit-event/edit-event-modal/edit-event-modal.component";
import { DatePipe } from '@angular/common';
import { EventServiceService } from '../../services/event-service.service';



@Component({
  selector: 'app-event',
  imports: [RouterLink, RouterLinkActive, EditEventModalComponent,DatePipe],
  templateUrl: './event.component.html',
  styleUrl: './event.component.css'
})
export class EventComponent {
  @Input() event!:Event;
  @Input() description:boolean=true;
  @Output() UpdateEvent = new EventEmitter<Event>();
  @Output() DeleteEvent = new EventEmitter<number>();

  isModalOpen = false;
  selectedEvent: Event | null = null;

  constructor(private eventService:EventServiceService){}

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
    //console.log(eventData);
    this.UpdateEvent.emit(eventData);
  }

  deleteEvent(id: number): void {
    this.DeleteEvent.emit(id);
    //console.log(id);
  }

}
