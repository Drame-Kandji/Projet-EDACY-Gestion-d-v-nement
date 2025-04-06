import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Login } from '../interfaces/login';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';
import { LoginSucces } from '../interfaces/login-succes';
import { CurrentUser } from '../interfaces/current-user';
import { UserConnected } from '../interfaces/user-connected';
import { json } from 'express';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  login=signal<any>(null);
  http=inject(HttpClient);
  api_url='http://localhost:8000/api'
  create_event=signal(false);
  user=signal<CurrentUser>({
    firstName: '',
    lastName: '',
    email: '',
    //avatar: ''
    role:''
  })

  constructor() {
    //localStorage.setItem('inscrit','false');
   }

  loginUser(user:Login):Observable<UserConnected>{
   return this.http.post<UserConnected>(`${this.api_url}/login`,user)
   //this.login.set(true);
  }

  logout()
  {

  }
  register(user:User):Observable<LoginSucces>{
    return this.http.post<LoginSucces>(`${this.api_url}/register`,user)
  }



  setUser(user:any=0,login:number){
    this.user.set(user)
    this.login.set(login)
    localStorage.setItem('user',JSON.stringify(user))
    localStorage.setItem('login',JSON.stringify(login))
  }
}
