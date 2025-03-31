// home.component.ts
import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Event } from '../../interfaces/event';
import { EventComponent } from "../../event/event/event.component";
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [NgFor, FormsModule,RouterLink,RouterLinkActive],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }
}
