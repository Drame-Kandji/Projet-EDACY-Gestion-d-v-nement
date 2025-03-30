import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  login=signal(false);
  constructor() { }

  loginService(){
    this.login.set(true);
  }
}
