import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from '../interfaces/event';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
export class EventServiceService {
  http=inject(HttpClient)
  api_url='http://localhost:8000/api/events'
  constructor() { }

  getEvents():Observable<Event[]>
  {
     return this.http.get<Event[]>(this.api_url)
  }

  getEvent(id:number):Observable<Event>
  {
    return this.http.get<Event>(`${this.api_url}/${id}`)
  }

  deleteEvent(id:number):Observable<Event>
  {
    return this.http.delete<Event>(`${this.api_url}/${id}`)
  }

  saveEvent(event:Event):Observable<Event>
  {
    return this.http.post<Event>(this.api_url,event)
  }
  
  updateEvent(event:Event,id:number):Observable<Event>
  {
    return this.http.patch<Event>(`${this.api_url}/${id}`,id)
  }
}
