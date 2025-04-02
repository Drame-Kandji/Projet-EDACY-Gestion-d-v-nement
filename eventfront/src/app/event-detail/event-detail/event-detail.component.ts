import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Event } from '../../interfaces/event';
import { EventComponent } from "../../event/event/event.component";
import { EventServiceService } from '../../services/event-service.service';
import { Succes, SuccesEvent } from '../../interfaces/succes';

@Component({
  selector: 'app-event-detail',
  imports: [EventComponent],
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.css'
})
export class EventDetailComponent implements OnInit{
   private route=inject(ActivatedRoute);
   constructor(private eventService:EventServiceService) { }
   event!:Event;
   description:boolean=true

   ngOnInit(): void {
    this.LoadEvent();
   }

   LoadEvent():void
   {
    let id:string|null=this.route.snapshot.paramMap.get('id');
    this.eventService.getEvent(id).subscribe((event: SuccesEvent) => {
      this.event=event.data;
      console.log(event);
    });
   }

}
