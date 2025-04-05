import { Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar/navbar.component';
import { LoginComponent } from './login/login/login.component';
import { RegisterComponent } from './register/register/register.component';
import { HomeComponent } from './home/home/home.component';
import { EventComponent } from './event/event/event.component';
import { EventDetailComponent } from './event-detail/event-detail/event-detail.component';
import { EventsComponent } from './events/events/events.component';
import { EditEventModalComponent } from './edit-event/edit-event-modal/edit-event-modal.component';
import { CalendarPageComponent } from './calendrier/calendar-page/calendar-page.component';
//import { AttendeesListComponent } from './genererPDF/attendees-list/attendees-list.component';

export const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'inscription',component:RegisterComponent},
  {path:'connexion',component:LoginComponent},
  {path:'event/:id',component:EventDetailComponent},
  {path:'events',component:EventsComponent},
  //{path:'calendrier',component:CalendarPageComponent}
 // {path:'/genererpdf',component:AttendeesListComponent}
];
