import { Event } from "./event";
export interface Succes {
  status:number;
  message:string;
  data:Event[];
}
export interface SuccesEvent {
  status:number;
  message:string;
  data:Event;
}
