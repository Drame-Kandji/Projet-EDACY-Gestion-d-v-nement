import { Component, computed, effect, inject, Input, Output,EventEmitter } from '@angular/core';
import { Event } from '../../interfaces/event';
import { Route, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { EditEventModalComponent } from "../../edit-event/edit-event-modal/edit-event-modal.component";
import { DatePipe } from '@angular/common';
import { EventServiceService } from '../../services/event-service.service';
import { LoginServiceService } from '../../services/login-service.service';




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
  signup:boolean=false;

  isModalOpen = false;
  selectedEvent: Event | null = null;
  currentUser: any={
    firstName: '',
    lastName: '',
    email: '',
    role:''
  };;

  constructor(private eventService:EventServiceService,private route:Router,private service:LoginServiceService){

    effect(() => {
      this.service.login();
        const user:any=localStorage.getItem('user')
        console.log(JSON.parse(user));
        this.currentUser=JSON.parse(user)
    });

  }

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

  inscrire(event:Event) {
    this.signup=!this.signup
    const logion:any=localStorage.getItem('login')
    //si l'utilisateur n'est pas authentifier
    if(!parseInt(logion)){
      console.log(logion);
      this.route.navigate(['/connexion'])
    }
    console.log('inscription................',this.signup);
  }
}
