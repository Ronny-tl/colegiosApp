import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  eventEmit = new EventEmitter<any>();

  constructor() { }

  toast(severity:string, title:string, message:string){
    this.eventEmit.emit(
      {
        severity: severity,
        title: title,
        message: message
      }
    )
  }
}
