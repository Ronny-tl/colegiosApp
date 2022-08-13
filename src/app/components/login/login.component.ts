import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  typeUser:string = null;
  ruta:string = null;
  imgBackground:any;

  listImg = {
    imgAlumno: 'https://cutewallpaper.org/23/study-wallpaper-hd/95326167.jpg',
    imgAdmin: 'https://i.pinimg.com/originals/56/5a/74/565a7443f107cccca5344b4fa2e4de3b.jpg',
    imgDocente: 'https://img.freepik.com/premium-photo/portrait-pretty-teacher-holding-notepads-classroom-school_13339-273031.jpg?w=2000',
    imgTutor: 'https://img.wallpapersafari.com/desktop/1920/1080/88/98/LuslEY.jpeg'
  }

  constructor(
    private route: ActivatedRoute,
    private router : Router,
    private sanitizer:DomSanitizer
  ) { 
    this.getTypeUser();
  }

  ngOnInit(): void {
    //console.log("RUTA", this.router.url);
    
  }

  getTypeUser(){
    // this.typeUser =  this.route.snapshot.paramMap.get('id');
    this.ruta = this.router.url;
    switch(this.ruta){
      case '/loginAlumno':
        this.imgBackground = this.sanitizer.bypassSecurityTrustStyle('url(' + this.listImg.imgAlumno + ')');
        break;
      case '/loginAdmin':
        this.imgBackground = this.sanitizer.bypassSecurityTrustStyle('url(' + this.listImg.imgAdmin + ')');
        break;
      case '/loginDocente':
        this.imgBackground = this.sanitizer.bypassSecurityTrustStyle('url(' + this.listImg.imgDocente + ')');
        break;
      case '/loginTutor':
        this.imgBackground = this.sanitizer.bypassSecurityTrustStyle('url(' + this.listImg.imgTutor + ')');
        break;
    }
  }

}
