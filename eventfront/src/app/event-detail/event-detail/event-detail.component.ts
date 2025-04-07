import { Component, effect, Inject, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Event } from '../../interfaces/event';
import { EventComponent } from "../../event/event/event.component";
import { EventServiceService } from '../../services/event-service.service';
import { Succes, SuccesEvent } from '../../interfaces/succes';
import { response } from 'express';
import { Participant } from '../../interfaces/participant';
import { LoginServiceService } from '../../services/login-service.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { isPlatformBrowser, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-event-detail',
  imports: [EventComponent,TitleCasePipe],
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.css',
})

export class EventDetailComponent implements OnInit{
notifier!:boolean;


  //private platformid=inject(object)
  private route=inject(ActivatedRoute);
  CurrentUser:any={
    firstName: '',
    lastName: '',
    email: '',
    role:''
  };

  participant:any=[];
   constructor(private eventService:EventServiceService,@Inject(PLATFORM_ID) private platformid:object) {
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
      if(isPlatformBrowser(this.platformid))
      this.CurrentUser=localStorage.getItem('user')
      this.CurrentUser=JSON.parse(this.CurrentUser);
      //console.log(this.CurrentUser);

   }

   LoadEvent()
   {
    let id:string|null=this.route.snapshot.paramMap.get('id');
    this.eventService.getEvent(id).subscribe((event: SuccesEvent) => {
      this.event=event.data;
      this.participants(id);
     // console.log(event);
    });
   }

   participants(id:string|null)
   {
      this.eventService.participants(id).subscribe(
        (response:Participant)=>{
         this.participant=response.participants
        // console.log(this.participant);
         //this.ngOnInit()
        }
      )
   }

   generatePDF(): void {
    const doc = new jsPDF()
    doc.setFontSize(18);
    doc.text(`Liste des participants à l'événement de ${this.event.title} `, 14, 22);
    autoTable(doc, {
      startY: 30,
      head: [['Prénom','Nom', 'Email']],
      body: this.participant.map((user: { firstName: string; lastName: string,email:string; }) => [user.firstName,user.lastName,user.email])
    });

    doc.save(`participants-${this.event.title}.pdf`);
    console.log('pdf generer');
  }

  refresh() {
    this.LoadEvent();
    console.log('refresh ....................',this.notifier);
    }

    notification($event: boolean) {
     this.notifier=$event;
    }
}
