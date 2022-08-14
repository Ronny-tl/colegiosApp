import { Component, OnInit } from '@angular/core';
import { PanelService } from './services/panel.service';
declare var $: any;
@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {
  flagSideBar:string = '';
  listSideBar:any[] = [];
  constructor(
    private panelService: PanelService

  ) { }

  ngOnInit(): void {
    this.checkUser();
  }

  checkUser(){
    this.listSideBar =  this.panelService.getListSideBar('apoderado');
    console.log(this.listSideBar);
    
  }

  showSideBar(){
    if(!!this.flagSideBar){
      this.flagSideBar = '';
    }else{
      this.flagSideBar = 'toggled';
    }
  }

}
