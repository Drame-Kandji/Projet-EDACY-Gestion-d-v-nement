import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Event } from '../interfaces/event';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { Succes, SuccesEvent } from '../interfaces/succes';
import { Inscrire } from '../interfaces/inscrire';
import { Participant } from '../interfaces/participant';

@Injectable({
  providedIn: 'root'
})
export class EventServiceService {
  http=inject(HttpClient)
  api_url='http://localhost:8000/api/evenements'
  constructor() { }

  getEvents():Observable<Succes>
  {
     return this.http.get<Succes>(this.api_url)
  }

  getEvent(id:string|null):Observable<SuccesEvent>
  {
    return this.http.get<SuccesEvent>(`${this.api_url}/${id}`)
  }

  deleteEvent(id:number):Observable<Event>
  {
    return this.http.delete<Event>(`${this.api_url}/${id}`)
  }

  saveEvent(event:FormData):Observable<Event>
  {
    console.log(event);

    return this.http.post<Event>(this.api_url,event)
  }

  updateEvent(event:FormData,id:number):Observable<SuccesEvent>
  {
    //console.log(event);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<SuccesEvent>(`${this.api_url}/${id}`,event)
  }

  inscrire(infos:Inscrire){
    return this.http.post<SuccesEvent>(`${this.api_url}/inscrire`,infos)
  }

  participants(idevent:string|null):Observable<Participant>{
   return this.http.get<Participant>(`${this.api_url}/${idevent}/participants`)
  }
}
