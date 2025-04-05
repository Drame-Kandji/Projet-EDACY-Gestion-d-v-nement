import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { log } from 'node:console';
import { User } from '../../interfaces/user';
import e, { response } from 'express';
import { LoginServiceService } from '../../services/login-service.service';
import { LoginSucces } from '../../interfaces/login-succes';
import { CurrentUser } from '../../interfaces/current-user';


@Component({
  selector: 'app-register',
  imports: [NgClass,ReactiveFormsModule,NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  loginForm: FormGroup;
    isLoading = false;
    loginError = '';
    isPasswordVisible = false;
    UserLogin!:LoginSucces;

    // Pour l'animation
    formOpacity = 0;
    formTransform = 'translateY(20px)';

    constructor(
      private fb: FormBuilder,
      private router: Router,
      private loginService:LoginServiceService
    ) {
      this.loginForm = this.fb.group({
        firstname:['',Validators.required],
        lastname:['',Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmed_password:['',Validators.required]
      });
    }

    ngOnInit(): void {
      // Animation d'entrée
      setTimeout(() => {
        this.formOpacity = 1;
        this.formTransform = 'translateY(0)';
      }, 200);
    }

    onSubmit(): void {
      if (this.loginForm.valid && (this.loginForm.get('password')?.value===this.loginForm.get('confirmed_password')?.value)) {
        this.isLoading = true;
        this.loginError = '';
        console.log(this.loginForm.value)
        // Simuler une requête d'authentification
        setTimeout(() => {
          const firstname=this.loginForm.get('firstname')?.value;
          const lastname=this.loginForm.get('lastname')?.value;
          const email = this.loginForm.get('email')?.value;
          const password = this.loginForm.get('password')?.value;
          const user:User={firstName:firstname,
            lastName:lastname,
            email:email,
            password:password
          }
          //console.log(user)
          this.loginService.register(user).subscribe(
            (response)=>{
              this.UserLogin=response
              console.log(this.UserLogin);
              if (this.UserLogin.status==200) {
                let currentUser:CurrentUser={
                  firstName:this.UserLogin.user.firstName,
                  lastName:this.UserLogin.user.lastName,
                  email:this.UserLogin.user.email,
                  role:this.UserLogin.role
                }
                this.loginService.user.set(currentUser);// Connexion réussie - rediriger vers le tableau de bord
                this.router.navigate(['/']);
              }
              else {
                // Échec de connexion
                this.loginError = 'Veuillez réessayer.';
              }
            }
          )

          this.isLoading = false;
        }, 1500);
      } else {
        // Marquer tous les champs comme touchés pour afficher les erreurs
        this.loginForm.markAllAsTouched();
      }
    }

    togglePasswordVisibility(): void {
      this.isPasswordVisible = !this.isPasswordVisible;
    }
}
