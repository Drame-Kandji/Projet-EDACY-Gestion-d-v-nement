import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';


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

    // Pour l'animation
    formOpacity = 0;
    formTransform = 'translateY(20px)';

    constructor(
      private fb: FormBuilder,
      private router: Router
    ) {
      this.loginForm = this.fb.group({
        lastname:['',Validators.required],
        firstname:['',Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
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
      if (this.loginForm.valid) {
        this.isLoading = true;
        this.loginError = '';

        // Simuler une requête d'authentification
        setTimeout(() => {
          const email = this.loginForm.get('email')?.value;
          const password = this.loginForm.get('password')?.value;

          if (email === 'admin@evenements.com' && password === 'password123') {
            // Connexion réussie - rediriger vers le tableau de bord
            this.router.navigate(['/dashboard']);
          } else {
            // Échec de connexion
            this.loginError = 'Identifiants incorrects. Veuillez réessayer.';
          }

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
