import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  typeUser:string;
  nombreUsuario:string;
  constructor(
    private panelService: PanelService,
    private router: Router
  ) { 
    this.typeUser = sessionStorage.getItem('typeUser');
    this.nombreUsuario = sessionStorage.getItem('nombreUsuario');
  }

  ngOnInit(): void {
    this.checkUser();
  }

  checkUser(){
    this.listSideBar =  this.panelService.getListSideBar(this.typeUser);
    if(this.router.url == '/panel'){
      this.router.navigate([this.listSideBar[0].ruta])
    }
    console.log(this.listSideBar);
    
  }

  showSideBar(){
    if(!!this.flagSideBar){
      this.flagSideBar = '';
    }else{
      this.flagSideBar = 'toggled';
    }
  }

  logout(){
    this.router.navigate(['/loginAdmin']);
    sessionStorage.clear();
  }

}
