import { Component, effect, inject, Input, Output,EventEmitter, Inject, PLATFORM_ID } from '@angular/core';
import { Event } from '../../interfaces/event';
import { Route, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { EditEventModalComponent } from "../../edit-event/edit-event-modal/edit-event-modal.component";
import { DatePipe, isPlatformBrowser, NgClass } from '@angular/common';
import { EventServiceService } from '../../services/event-service.service';
import { LoginServiceService } from '../../services/login-service.service';
import { Inscrire } from '../../interfaces/inscrire';




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
  @Output() refresh= new EventEmitter<void>();
  @Output() notifiction= new EventEmitter<boolean>();
  signup:boolean=false;
  eventService=inject(EventServiceService);

  isModalOpen = false;
  selectedEvent: Event | null = null;
  currentUser: any=null
  image:string= 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsZKe0dmRCFFxubB06zPpvPgSr9BHpvIIOXA&s'//'../../assets/images/conference.jpg';

  constructor(@Inject(PLATFORM_ID) private platformeId:object, private route:Router,private service:LoginServiceService){

    effect(() => {
      this.service.login();
      let user:any=null;
      let inscrit:any=null;
        if(isPlatformBrowser(platformeId))
        user=localStorage.getItem('user')
        console.log(JSON.parse(user));
        this.currentUser=JSON.parse(user)
        if(isPlatformBrowser(platformeId))
        inscrit=localStorage.getItem('inscrit')
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
  getUser(event:Event)
  {
    let user:any
    if(isPlatformBrowser(this.platformeId)){
    user=localStorage.getItem('user');
    }
    user=JSON.parse(user)
      const User_infos:Inscrire={
        id:event.id,
        email:user.email,
        token:user.token
      }
      return User_infos

  }
   getIsLogion()
   {
    let Islogin:any;
    if(isPlatformBrowser(this.platformeId)){
      Islogin=localStorage.getItem('login');
    }
    return Islogin;
   }
  inscrire(event:Event) {
    this.signup=true
    const Islogin:any=this.getIsLogion()
    const infos=this.getUser(event)
    //si l'utilisateur n'est pas authentifier
    if(!parseInt(Islogin)){
      console.log(Islogin);
      this.route.navigate(['/connexion']);
    }
    else
    {
      this.eventService.inscrire(infos.id,infos.token).subscribe(
        (response)=>{
          console.log(response);
        }
      )
      this.service.setInscrire('true');
      this.refresh.emit();
      this.notifiction.emit(this.signup);
      console.log('inscription................',infos);
    }
  }

  desinscrire(event:Event){
    this.signup=false
    const infos=this.getUser(event);
    this.service.setInscrire('false')
    this.eventService.desinscrire(infos.id,infos.token).subscribe(
      response=>{
        console.log(response);
      }
    )
    this.refresh.emit();
    this.notifiction.emit(this.signup);
  }
  getImageUrl(path: string): string {
    //console.log(path)
    return `http://localhost:8000/storage/${path}`;
  }
}
