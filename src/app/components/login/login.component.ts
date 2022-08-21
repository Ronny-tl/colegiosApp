import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/shared/services/toast.service';
import { LoginService } from './services/login.service';

declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  typeUser:string = null;
  ruta:string = null;
  imgBackground:any;
  formLogin:FormGroup;

  usuario = 'usuario';
  password = 'password';

  listImg = {
    imgAlumno: 'https://cutewallpaper.org/23/study-wallpaper-hd/95326167.jpg',
    imgAdmin: 'https://i.pinimg.com/originals/56/5a/74/565a7443f107cccca5344b4fa2e4de3b.jpg',
    imgDocente: 'https://img.freepik.com/premium-photo/portrait-pretty-teacher-holding-notepads-classroom-school_13339-273031.jpg?w=2000',
    imgTutor: 'https://img.wallpapersafari.com/desktop/1920/1080/88/98/LuslEY.jpeg'
  }

  constructor(
    private route: ActivatedRoute,
    private router : Router,
    private sanitizer:DomSanitizer,
    private toastService: ToastService,
    private loginService: LoginService,
    private _fb:FormBuilder,

  ) { 
    this.getTypeUser();
    this.crearFormulario();
  }

  ngOnInit(): void {
    //console.log("RUTA", this.router.url);
    
  }

  crearFormulario(){
    this.formLogin = this._fb.group({
      [this.usuario]: [null],
      [this.password]: [null]
    })
  }

  getTypeUser(){
    // this.typeUser =  this.route.snapshot.paramMap.get('id');
    this.ruta = this.router.url;
    switch(this.ruta){
      case '/loginAlumno':
        this.typeUser = 'alumno'
        this.imgBackground = this.sanitizer.bypassSecurityTrustStyle('url(' + this.listImg.imgAlumno + ')');
        break;
      case '/loginAdmin':
        this.typeUser = 'admin'
        this.imgBackground = this.sanitizer.bypassSecurityTrustStyle('url(' + this.listImg.imgAdmin + ')');
        break;
      case '/loginDocente':
        this.typeUser = 'docente'
        this.imgBackground = this.sanitizer.bypassSecurityTrustStyle('url(' + this.listImg.imgDocente + ')');
        break;
      case '/loginApoderado':
        this.typeUser = 'apoderado'
        this.imgBackground = this.sanitizer.bypassSecurityTrustStyle('url(' + this.listImg.imgTutor + ')');
        break;
    }
  }

  login(){
    if(!this.formLogin.get(this.usuario).value || !this.formLogin.get(this.usuario).value){
      this.toastService.toast('error', 'Error', 'Ingrese el campo usuario y contraseña correctamente!');
      return;
    }
    if(this.typeUser == 'admin'){
      this.loginService.login(this.formLogin.value).subscribe(response => {
        console.log(response);
        sessionStorage.setItem('typeUser', this.typeUser);
        sessionStorage.setItem('nombreUsuario', response.nombres);
        this.toastService.toast('success', 'Exito', response.mensaje);
        this.router.navigate(['/panel']);
      }, err => {
        console.log(err);
        this.toastService.toast('error', 'Error', err.error.mensaje);
      })
    }else if(this.typeUser == 'alumno'){
      let data = this.formLogin.value;
      data.correo = data.usuario;
      this.loginService.loginAlumno(data).subscribe(response => { 
        sessionStorage.setItem('typeUser', this.typeUser);
        sessionStorage.setItem('nombreUsuario', response.nombres);
        sessionStorage.setItem('codigoAlumno', response.codigoAlumno);
        this.toastService.toast('success', 'Exito', response.mensaje);
        this.router.navigate(['/panel']);
      }, err => {
        console.log(err);
        this.toastService.toast('error', 'Error', err.error.mensaje);
      })
    }else if(this.typeUser == 'apoderado'){
        
    }

  }

  openModalRegistro(val){
    $('#registrarAlumno').modal(val ? 'show' : 'hide'); 
  }

}
