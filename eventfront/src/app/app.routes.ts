import { Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar/navbar.component';
import { LoginComponent } from './login/login/login.component';
import { RegisterComponent } from './register/register/register.component';
import { HomeComponent } from './home/home/home.component';
import { EventComponent } from './event/event/event.component';
import { EventDetailComponent } from './event-detail/event-detail/event-detail.component';

export const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'inscription',component:RegisterComponent},
  {path:'connexion',component:LoginComponent},
  {path:'event/:id',component:EventDetailComponent}
];
