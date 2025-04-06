import { Component, effect, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Event } from '../../interfaces/event';
import { EventComponent } from "../../event/event/event.component";
import { EventServiceService } from '../../services/event-service.service';
import { Succes, SuccesEvent } from '../../interfaces/succes';
import { response } from 'express';
import { Participant } from '../../interfaces/participant';
import { LoginServiceService } from '../../services/login-service.service';

@Component({
  selector: 'app-event-detail',
  imports: [EventComponent],
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.css'
})
export class EventDetailComponent implements OnInit{
  private route=inject(ActivatedRoute);
  user:any=localStorage.getItem('user')
  participant:any=[];
   constructor(private eventService:EventServiceService) {
    }
   event:Event={
     id: 0,
     title: '',
     description: '',
     date: '',
     location: '',
     heure: '',
     image: '',
     category: '',
     attendees: 0
   };
   description:boolean=true

   ngOnInit(): void {
      this.LoadEvent();
      this.user=JSON.parse(this.user);
   }

   LoadEvent()
   {
    let id:string|null=this.route.snapshot.paramMap.get('id');
    this.eventService.getEvent(id).subscribe((event: SuccesEvent) => {
      this.event=event.data;
      this.participants(id);
      console.log(event);
    });
   }

   participants(id:string|null)
   {
      this.eventService.participants(id).subscribe(
        (response:Participant)=>{
         this.participant=response.participants
         console.log(this.participant);
         //this.ngOnInit()
        }
      )
   }

  refresh() {
    this.LoadEvent()
    }
}
