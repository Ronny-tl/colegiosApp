import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { AlumnoService } from './services/alumno.service';
import { ApoderadoService } from './services/apoderado.service';
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
  dataUsuario: any;
  url = environment.url;
  base64textString = [];
  fotoUsuario:any;
  constructor(
    private panelService: PanelService,
    private router: Router,
    private alumnoService: AlumnoService,
    private spinner: NgxSpinnerService,
    private apoderadoService: ApoderadoService
  ) { 
    this.typeUser = sessionStorage.getItem('typeUser');
    this.nombreUsuario = sessionStorage.getItem('nombreUsuario');
  }

  ngOnInit(): void {
    this.checkUser();
    if(this.typeUser == 'alumno'){
      this.getInfoAlumno();
    }else if(this.typeUser == 'apoderado'){
      this.getInfoApoderado();
    }
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
    this.router.navigate(['/']);
    sessionStorage.clear();
  }

  getInfoAlumno(){
    this.alumnoService.getAlumnoById(sessionStorage.getItem('codigoAlumno')).subscribe(response => {
      this.dataUsuario = response;
    })
  }

  getInfoApoderado(){
    this.apoderadoService.getApoderadosById(sessionStorage.getItem('codigoTutor')).subscribe(response => {
      this.dataUsuario = response;
    })
  }

  getFotoUsuario(){
    return this.dataUsuario?.imagen.includes(environment.url) ? this.dataUsuario?.imagen: this.url + this.dataUsuario?.imagen;
  }

  upload($event){
    this.spinner.show();
    if(this.typeUser == 'alumno'){
      let data = {
        codigoAlumno: sessionStorage.getItem('codigoAlumno'),
        imagen: $event.files[0]
      }
      this.alumnoService.setAlumnoImage(data).subscribe(response => {
        console.log(response);
        this.getInfoAlumno();
        this.spinner.hide();
      }, err => {
        console.log(err);
        this.spinner.hide();
      })
    }else if(this.typeUser == 'apoderado'){
      let data = {
        codigoTutor: sessionStorage.getItem('codigoTutor'),
        imagen: $event.files[0]
      }
      this.apoderadoService.setApoderadoImage(data).subscribe(response => {
        console.log(response);
        this.getInfoApoderado();
        this.spinner.hide();
      }, err => {
        console.log(err);
        this.spinner.hide();
      })
    }
  
  }

  // handleReaderLoaded(e) {

  //     this.base64textString.push('data:image/jpg;base64,' + btoa(e.target.result));
  //     console.log(this.base64textString[0]);
  //     this.dataUsuario.imagen = this.base64textString[0];
  //     this.alumnoService.updateAlumno(this.dataUsuario).subscribe(response => {
  //       console.log(response);
  //       this.spinner.hide();
  //     }, err => {
  //       console.log(err);
  //       this.spinner.hide();
  //     })
  // }
}
