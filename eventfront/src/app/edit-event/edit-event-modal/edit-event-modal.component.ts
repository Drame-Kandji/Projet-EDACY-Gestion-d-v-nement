// edit-event-modal.component.ts
import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

// Interface pour le modèle d'événement
export interface Event {
  id: number;
  title: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  category: string;
  imageUrl?: string;
  maxParticipants?: number;
  isPublic: boolean;
}

@Component({
  selector: 'app-edit-event-modal',
  imports:[ReactiveFormsModule,NgIf,BrowserModule],
  templateUrl: './edit-event-modal.component.html',
  styleUrls: ['./edit-event-modal.component.css']
})
export class EditEventModalComponent implements OnInit {
  @Input() show: boolean = false;
  @Input() event: Event | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Event>();

  eventForm!: FormGroup;
  isSubmitting: boolean = false;

  // Catégories d'événements (à adapter selon vos besoins)
  categories = [
    { id: 'conference', name: 'Conférence' },
    { id: 'seminar', name: 'Séminaire' },
    { id: 'workshop', name: 'Atelier' },
    { id: 'party', name: 'Fête' },
    { id: 'concert', name: 'Concert' },
    { id: 'exhibition', name: 'Exposition' },
    { id: 'meeting', name: 'Réunion' },
    { id: 'other', name: 'Autre' }
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  ngOnChanges(): void {
    if (this.show && this.event && this.eventForm) {
      this.populateForm();
    }
  }

  initForm(): void {
    this.eventForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(20)]],
      location: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      category: ['', Validators.required],
      imageUrl: [''],
      maxParticipants: [0],
      isPublic: [true]
    });

    if (this.event) {
      this.populateForm();
    }
  }

  populateForm(): void {
    if (!this.event) return;

    // Formater les dates pour l'input datetime-local
    const startDate = this.formatDateForInput(new Date(this.event.startDate));
    const endDate = this.formatDateForInput(new Date(this.event.endDate));

    this.eventForm.patchValue({
      title: this.event.title,
      description: this.event.description,
      location: this.event.location,
      startDate: startDate,
      endDate: endDate,
      category: this.event.category,
      imageUrl: this.event.imageUrl || '',
      maxParticipants: this.event.maxParticipants || 0,
      isPublic: this.event.isPublic
    });
  }

  formatDateForInput(date: Date): string {
    // Format date to YYYY-MM-DDThh:mm
    return date.toISOString().slice(0, 16);
  }

  onSubmit(): void {
    if (this.eventForm.invalid) {
      this.eventForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    // Créer l'objet événement mis à jour
    const updatedEvent: Event = {
      id: this.event ? this.event.id : 0,
      ...this.eventForm.value
    };

    // Simuler un délai de soumission (remplacer par votre API réelle)
    setTimeout(() => {
      this.save.emit(updatedEvent);
      this.isSubmitting = false;
      this.closeModal();
    }, 800);
  }

  closeModal(): void {
    this.close.emit();
  }

  // Empêcher la propagation des clics dans le modal
  stopPropagation(event: MouseEvent): void {
    event.stopPropagation();
  }

  // Raccourci pour accéder aux contrôles du formulaire
  get f() {
    return this.eventForm.controls;
  }
}
