// edit-event-modal.component.ts
import { CommonModule, NgIf } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Event } from '../../interfaces/event';


@Component({
  selector: 'app-edit-event-modal',
  imports:[ReactiveFormsModule,CommonModule],
  templateUrl: './edit-event-modal.component.html',
  styleUrls: ['./edit-event-modal.component.css']
})
export class EditEventModalComponent implements OnInit {
  @Input() isOpen = false;
  @Input() event:Event  | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<FormData>();

  eventForm: FormGroup;
  isSubmitting = false;
  imagePreview: string | null = null;
  image:any;

  categories = [
    'Conférence',
    'Atelier',
    'Réunion',
    'Séminaire',
    'Formation',
    'Webinaire',
    'Concert',
    'Exposition',
    'Festival',
    'Sport'
  ];

  constructor(private fb: FormBuilder) {
    this.eventForm = this.fb.group({
      id: [null],
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      date: ['', Validators.required],
      heure: ['', Validators.required],
      location: ['', Validators.required],
      category: ['', Validators.required],
      attendees: [0, [Validators.required, Validators.min(1)]],
      image: ['']
    });
  }

  ngOnInit(): void {
    this.resetForm();
  }

  ngOnChanges(): void {
    this.resetForm();
  }

  resetForm(): void {
    if (this.event) {
      this.eventForm.patchValue({
        id: this.event.id,
        title: this.event.title,
        description: this.event.description,
        date: this.event.date,
        heure: this.event.heure,
        location: this.event.location,
        category: this.event.category,
        attendees: this.event.attendees,
        image: ''
      });
      this.imagePreview = this.event.image || null;
    } else {
      this.eventForm.reset({
        attendees: 1,
        category: this.categories[0]
      });
      this.imagePreview = null;
    }
  }

  onClose(): void {
    this.close.emit();
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      this.isSubmitting = true;

      // Simuler un délai d'API
      setTimeout(() => {
        const formData = new FormData();
        formData.append('title', this.eventForm.value.title);
        formData.append('description', this.eventForm.value.description);
        formData.append('date', this.eventForm.value.date);
        formData.append('heure', this.eventForm.value.heure);
        formData.append('location', this.eventForm.value.location);
        formData.append('category', this.eventForm.value.category);
        formData.append('attendees', this.eventForm.value.attendees);
        if(this.image)
        formData.append('image',this.image);
        // Si une nouvelle image a été chargée, utiliser le preview
        // sinon, garder l'image existante
        /* if (this.imagePreview && formData.image) {
          formData.image = this.imagePreview;
        } */
          //formData.append('_method', 'PATCH');
        this.save.emit(formData);
        this.isSubmitting = false;
        this.onClose();
      }, 800);
    } else {
      this.eventForm.markAllAsTouched();
    }
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    console.log(file);
    if (file) {
      this.image=file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage(): void {
    this.imagePreview = null;
    this.eventForm.patchValue({ image: '' });
  }

  getImageUrl(path: string): string {
    //console.log(path)
    return `http://localhost:8000/storage/${path}`;
  }
}
