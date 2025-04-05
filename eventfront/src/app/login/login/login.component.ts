// login.component.ts
import { NgClass, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginServiceService } from '../../services/login-service.service';
import { UserConnected } from '../../interfaces/user-connected';
import { Login } from '../../interfaces/login';

@Component({
  selector: 'app-login',
  imports:[NgClass,NgIf,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading = false;
  loginError = '';
  service=inject(LoginServiceService)
  isPasswordVisible = false;

  // Pour l'animation
  formOpacity = 0;
  formTransform = 'translateY(20px)';

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
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
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.loginError = '';

      // Simuler une requête d'authentification
      setTimeout(() => {
        const email = this.loginForm.get('email')?.value;
        const password = this.loginForm.get('password')?.value;
        const login_password:Login=this.loginForm.value;
        this.service.loginUser(login_password).subscribe(
          (data)=>{
            if (data.token) {
              this.service.user.set(data.user)
              this.service.login.set(true)
              this.router.navigate(['/']);
            } else {
              // Échec de connexion
              this.loginError = 'Identifiants incorrects. Veuillez réessayer.';
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
