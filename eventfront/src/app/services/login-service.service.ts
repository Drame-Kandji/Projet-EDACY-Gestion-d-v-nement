import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Login } from '../interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  login=signal(false);
  http=inject(HttpClient);
  api_url='http://localhost:8000/api/events/login'
  create_event=signal(false);
  constructor() { }

  loginUser(infos:Login){
    this.http.post(this.api_url,infos)
    this.login.set(true);
  }

  logout()
  {
    
  }
}
