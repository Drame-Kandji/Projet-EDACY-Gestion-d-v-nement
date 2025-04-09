// calendar-page.component.ts
import { Component, OnInit } from '@angular/core';
import { EventServiceService } from '../../services/event-service.service';
import { Succes } from '../../interfaces/succes';
import { Event } from '../../interfaces/event';
import { EditEventModalComponent } from "../../edit-event/edit-event-modal/edit-event-modal.component";
import { CommonModule, DatePipe } from '@angular/common';

interface CalendarDay {
  date: Date;
  events: Event[];
  isCurrentMonth: boolean;
  isToday: boolean;
}

interface CalendarWeek {
  days: CalendarDay[];
}

@Component({
  selector: 'app-calendar-page',
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.component.css'],
  imports: [EditEventModalComponent,CommonModule,DatePipe]
})
export class CalendarPageComponent implements OnInit {
  events:Event[] = [];
  calendarWeeks: CalendarWeek[] = [];
  currentDate: Date = new Date();
  currentMonth: number;
  currentYear: number;
  selectedDate: Date | null = null;
  selectedEvents: Event[] = [];
  isLoading = true;

  // Modal controls
  isEventModalOpen = false;
  selectedEvent: Event | null = null;

  // Pour l'affichage
  weekdays = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  months = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  constructor(private eventService: EventServiceService) {
    this.currentMonth = this.currentDate.getMonth();
    this.currentYear = this.currentDate.getFullYear();
  }

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.isLoading = true;
    this.eventService.getEvents().subscribe({
      next: (events:Succes) => {
        this.events = events.data;
        this.generateCalendarDays();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des événements', error);
        this.isLoading = false;
      }
    });
  }

  generateCalendarDays(): void {
    const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1);
    const lastDayOfMonth = new Date(this.currentYear, this.currentMonth + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();

    // Obtenir le jour de la semaine (0-6) du premier jour du mois
    let firstDayOfWeek = firstDayOfMonth.getDay();

    // Calculer la date de début du calendrier
    // (on peut avoir besoin d'afficher des jours du mois précédent)
    const startDate = new Date(firstDayOfMonth);
    startDate.setDate(1 - firstDayOfWeek);

    // Générer 6 semaines (42 jours) pour assurer que le calendrier couvre tout le mois
    const totalDays = 42;
    const days: CalendarDay[] = [];

    for (let i = 0; i < totalDays; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);

      const eventsOnThisDay = this.events.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate.getDate() === date.getDate() &&
               eventDate.getMonth() === date.getMonth() &&
               eventDate.getFullYear() === date.getFullYear();
      });

      days.push({
        date: date,
        events: eventsOnThisDay,
        isCurrentMonth: date.getMonth() === this.currentMonth,
        isToday: this.isToday(date)
      });
    }

    // Diviser les jours en semaines
    this.calendarWeeks = [];
    for (let i = 0; i < 6; i++) {
      this.calendarWeeks.push({
        days: days.slice(i * 7, (i + 1) * 7)
      });
    }

    // Si le jour actuel est dans le mois affiché, sélectionnez-le par défaut
    if (this.currentDate.getMonth() === this.currentMonth &&
        this.currentDate.getFullYear() === this.currentYear) {
      const today = days.find(day => this.isToday(day.date));
      if (today) {
        this.selectDate(today);
      }
    }
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  }

  selectDate(day: CalendarDay): void {
    this.selectedDate = day.date;
    this.selectedEvents = day.events;
  }

  prevMonth(): void {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.generateCalendarDays();
  }

  nextMonth(): void {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.generateCalendarDays();
  }

  goToToday(): void {
    const today = new Date();
    this.currentMonth = today.getMonth();
    this.currentYear = today.getFullYear();
    this.generateCalendarDays();
  }

  formatTime(time: string): string {
    return time;
  }

  getEventCategoryClass(category: string): string {
    const categoryColors: { [key: string]: string } = {
      'conférence': 'bg-blue-100 text-blue-800',
      'concert': 'bg-purple-100 text-purple-800',
      'atelier': 'bg-green-100 text-green-800',
      'exposition': 'bg-amber-100 text-amber-800',
      'Networking': 'bg-indigo-100 text-indigo-800',
      'sport': 'bg-red-100 text-red-800',
      'formation': 'bg-teal-100 text-teal-800',
      'Culturel': 'bg-pink-100 text-pink-800'
    };

    return categoryColors[category] || 'bg-gray-100 text-gray-800';
  }

 

  closeEventModal(): void {
    this.isEventModalOpen = false;
  }

  handleEventSaved(eventData: FormData): void
  {

  }

  findDayByDate(date: Date): CalendarDay | undefined {
    for (const week of this.calendarWeeks) {
      for (const day of week.days) {
        if (day.date.getDate() === date.getDate() &&
            day.date.getMonth() === date.getMonth() &&
            day.date.getFullYear() === date.getFullYear()) {
          return day;
        }
      }
    }
    return undefined;
  }

  
}
