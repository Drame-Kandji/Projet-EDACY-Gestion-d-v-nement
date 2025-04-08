import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Login } from '../interfaces/login';
import { User } from '../interfaces/user';
import { catchError, Observable, throwError } from 'rxjs';
import { LoginSucces } from '../interfaces/login-succes';
import { CurrentUser } from '../interfaces/current-user';
import { UserConnected } from '../interfaces/user-connected';
import { json } from 'express';
import { sign } from 'crypto';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  login=signal<any>(null);
  http=inject(HttpClient);
  api_url='http://localhost:8000/api'
  create_event=signal(false);
  loginMessage=signal('');
  registerMessage=signal('');
  user=signal<CurrentUser>({
    firstName: '',
    lastName: '',
    email: '',
    role:'',
    token:''
  })

  constructor() {
   }

  loginUser(user:Login):Observable<UserConnected>{
   return this.http.post<UserConnected>(`${this.api_url}/login`,user).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        this.loginMessage.set('Identifiants incorrects. Veuillez réessayer.');
      } else if (error.status === 500) {
        this.loginMessage.set('Une erreur serveur est survenue. Veuillez réessayer plus tard.');
      } else {
        this.loginMessage.set('Une erreur est survenue.');
      }
      return throwError(() => null); // Ou tu peux retourner `of(null)` si tu veux éviter le crash
    })
  )
   //this.login.set(true);
  }

  logout(token:string)
  {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.api_url}/logout`,{headers})
  }
  register(user:User):Observable<LoginSucces>{
    return this.http.post<LoginSucces>(`${this.api_url}/register`,user).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 422) {
          this.registerMessage.set('Vous étes déja inscrit.');
        } else if (error.status === 500) {
          this.registerMessage.set('Une erreur serveur est survenue. Veuillez réessayer plus tard.');
        } else {
          this.registerMessage.set('Une erreur est survenue.');
        }
        return throwError(() => this.registerMessage()); // Ou tu peux retourner `of(null)` si tu veux éviter le crash
      })
    )
  }

  setInscrire(incrit:string){
    localStorage.setItem('inscrit',incrit)
  }

  setUser(user:any=0,login:number){
    this.user.set(user)
    this.login.set(login)
    localStorage.setItem('user',JSON.stringify(user))
    localStorage.setItem('login',JSON.stringify(login))
  }
}
