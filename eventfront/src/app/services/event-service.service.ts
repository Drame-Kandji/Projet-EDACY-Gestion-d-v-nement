import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Event } from '../interfaces/event';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { Succes, SuccesEvent } from '../interfaces/succes';

@Injectable({
  providedIn: 'root'
})
export class EventServiceService {
  http=inject(HttpClient)
  api_url='http://localhost:8000/api/evenements'
  private eventsSubject = new BehaviorSubject<Event[]>([]);
  events$ = this.eventsSubject.asObservable();
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

  saveEvent(event:Event):Observable<Event>
  {
    console.log(event);

    return this.http.post<Event>(this.api_url,event)
  }

  updateEvent(event:Event):Observable<SuccesEvent>
  {
    console.log(event);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.patch<SuccesEvent>(`${this.api_url}/${event.id}`,event).pipe(
      tap((response: SuccesEvent) => console.log(response))
    )
  }
}
