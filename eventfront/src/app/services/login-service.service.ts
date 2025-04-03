import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Login } from '../interfaces/login';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';
import { LoginSucces } from '../interfaces/login-succes';
import { CurrentUser } from '../interfaces/current-user';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  login=signal(false);
  http=inject(HttpClient);
  api_url='http://localhost:8000/api'
  create_event=signal(false);
  user=signal<CurrentUser>({
    firstName: '',
    lastName: '',
    email: '',
    //avatar: ''
  })
  
  constructor() { }

  loginUser(infos:Login){
    this.http.post(this.api_url,infos)
    this.login.set(true);
  }

  logout()
  {

  }
  register(user:User):Observable<LoginSucces>{
    return this.http.post<LoginSucces>(`${this.api_url}/register`,user)
  }
}
