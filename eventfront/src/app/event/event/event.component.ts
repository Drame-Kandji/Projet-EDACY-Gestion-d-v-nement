import { Component, computed, effect, inject, Input, Output,EventEmitter } from '@angular/core';
import { Event } from '../../interfaces/event';
import { Route, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { EditEventModalComponent } from "../../edit-event/edit-event-modal/edit-event-modal.component";
import { DatePipe, NgClass } from '@angular/common';
import { EventServiceService } from '../../services/event-service.service';
import { LoginServiceService } from '../../services/login-service.service';
import { log } from 'node:console';
import { Inscrire } from '../../interfaces/inscrire';
import { response } from 'express';




@Component({
  selector: 'app-event',
  imports: [RouterLink, RouterLinkActive, EditEventModalComponent,DatePipe,NgClass],
  templateUrl: './event.component.html',
  styleUrl: './event.component.css'
})
export class EventComponent {

  @Input() event!:Event;
  @Input() description:boolean=true;
  @Output() UpdateEvent = new EventEmitter<FormData>();
  @Output() DeleteEvent = new EventEmitter<number>();
  @Output() refresh= new EventEmitter<void>()
  signup:boolean=false;
  eventService=inject(EventServiceService);

  isModalOpen = false;
  selectedEvent: Event | null = null;
  currentUser: any={
    firstName: '',
    lastName: '',
    email: '',
    role:''
  };;
  image:string= 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsZKe0dmRCFFxubB06zPpvPgSr9BHpvIIOXA&s'//'../../assets/images/conference.jpg';

  constructor(private route:Router,private service:LoginServiceService){

    effect(() => {
      this.service.login();
        const user:any=localStorage.getItem('user')
        console.log(JSON.parse(user));
        this.currentUser=JSON.parse(user)
        let inscrit:any=localStorage.getItem('inscrit')
        inscrit=JSON.parse(inscrit)
        this.signup=inscrit

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

  saveEvent(eventData: FormData): void {
    //console.log(eventData);
    this.UpdateEvent.emit(eventData);
  }

  deleteEvent(id: number): void {
    this.DeleteEvent.emit(id);
    //console.log(id);
  }

  inscrire(event:Event) {
    this.signup=true
    const logion:any=localStorage.getItem('login');
    let user:any=localStorage.getItem('user');
    //si l'utilisateur n'est pas authentifier
    if(!parseInt(logion)){
      console.log(logion);
      this.route.navigate(['/connexion']);
    }
    else
    {
      console.log(user);
      user=JSON.parse(user)
      const inofs:Inscrire={
        id:event.id,
        email:user.email
      }
      console.log(inofs);

      this.eventService.inscrire(inofs).subscribe(
        (response)=>{
          console.log(response);
        }
      )
      this.service.setInscrire('true');
      this.refresh.emit()
      console.log('inscription................',inofs);
    }
  }
  
  desinscrire(event:Event){
    this.signup=false
    this.service.setInscrire('false')
  }

  getImageUrl(path: string): string {
    //console.log(path)
    return `http://localhost:8000/storage/${path}`;
  }
}
