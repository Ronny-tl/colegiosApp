import { Component, OnInit, Renderer2 } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {
  flagSideBar:string = '';
  constructor(
    private rd: Renderer2
  ) { }

  ngOnInit(): void {
  }

  showSideBar(){
    if(!!this.flagSideBar){
      this.flagSideBar = '';
    }else{
      this.flagSideBar = 'toggled';
    }
  }

}
