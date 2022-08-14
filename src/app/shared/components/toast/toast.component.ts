import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {
  show:boolean = false;
  sub:Subscription;
  title:string;
  message: string;
  icon:string;
  color:string;

  listIcon = {
    iconSuccess: 'fas fa-check',
    iconError: 'fas fa-times-circle'
  }
  constructor(
    private toastService: ToastService
  ) { 
    this.sub = this.toastService.eventEmit.subscribe(response => {
      this.message = response.message;
      this.title = response.title;
      if(response.severity == 'success'){
        this.icon = this.listIcon.iconSuccess
      }else if(response.severity == 'error'){
        this.icon = this.listIcon.iconError
      }
      this.runCount();
    })
  }

  ngOnInit(): void {
  }

  runCount(){
    this.show = true;
    setTimeout(() => {
      this.show = false;
    }, 3500);
  }

}
