import { Component, Input } from '@angular/core';
import { Event } from '../../interfaces/event';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-event',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './event.component.html',
  styleUrl: './event.component.css'
})
export class EventComponent {
  @Input() event!:Event;
  @Input() description:boolean=true;
}
