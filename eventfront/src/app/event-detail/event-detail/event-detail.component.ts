import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Event } from '../../interfaces/event';
import { EventComponent } from "../../event/event/event.component";

@Component({
  selector: 'app-event-detail',
  imports: [EventComponent],
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.css'
})
export class EventDetailComponent implements OnInit{
   private route=inject(ActivatedRoute);
   event!:Event;
   description:boolean=true

   ngOnInit(): void {
       let id=this.route.snapshot.paramMap.get('id');
       this.event={
        id: 1,
        title: 'Conférence Technologie Web 2025',
        description:"Créez, gérez et partagez vos événements professionnels ou personnels.Une plateforme complète pour tous vos besoins événementiels.",
        date: '15 Avril 2025',
        location: 'Paris Expo Porte de Versailles',
        heure:'15',
        image: 'https://www.brgm.fr/sites/default/files/images/2020-08/evenement-mining-indaba-2020-001.jpg',
        category: 'Conférence',
        attendees: 1250,
      }
   }
}
