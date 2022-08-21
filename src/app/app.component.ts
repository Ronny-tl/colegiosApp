import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlumnoService } from './components/panel/services/alumno.service';
import { ToastService } from './shared/services/toast.service';

declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'colegiosApp';

  formAlumno:FormGroup;
  
  codigoAlumno = 'codigoAlumno';
  codigoTutor = 'codigoTutor';
  nombres = 'nombres';
  apellidos = 'apellidos';
  direccion = 'direccion';
  fechaNacimiento = 'fechaNacimiento';
  tipoDocumento = 'tipoDocumento';
  numDocumento = 'numDocumento';
  telefono = 'telefono';
  correo = 'correo';
  password = 'password';
  alumnoVerificado = 'alumnoVerificado';

  constructor(
    private alumnoService: AlumnoService,
    private _fb:FormBuilder,
    private toastService: ToastService,
    private spinner: NgxSpinnerService
  ) { 
    this.crearFormulario();
  }

  ngOnInit(): void {

  }

  crearFormulario(){
    this.formAlumno = this._fb.group({
      [this.codigoAlumno]: [null],
      [this.nombres]: [null, [Validators.required]],
      [this.apellidos]: [null, [Validators.required]],
      [this.direccion]: [null, [Validators.required]],
      [this.fechaNacimiento]: [null, [Validators.required]],
      [this.tipoDocumento]: [null, [Validators.required]],
      [this.numDocumento]: [null, [Validators.required]],
      [this.telefono]: [null, [Validators.required]],
      [this.correo]: [null, [Validators.required]],
      [this.password]: [null, [Validators.required]],
      [this.alumnoVerificado]: [false]
    })
  }

  registrar(){
    this.spinner.show();
    let data = this.formAlumno.value;
    data.fechaNacimiento = moment(new Date(data.fechaNacimiento)).format('YYYY-MM-DD')
    data.alumnoVerificado = false;
    this.alumnoService.setAlumnoGlobal(data).subscribe(response => {
      this.toastService.toast('success', 'Exito', data.nombres+ ' fue registrado exitosamente!!');
      this.openModalRegistro(false);
      this.formAlumno.reset();
      this.spinner.hide();
    }, err => {
      if(err.error.correo){
        this.toastService.toast('error', 'Error', 'El email ingresado ya se encuentra registrado');
      }else{
        this.toastService.toast('error', 'Error', 'Ocurrio un problema al registrar por favor pongase en contacto con el administrador');
      }
      this.spinner.hide();
    })
  }

  openModalRegistro(val){
    $('#registrarAlumno').modal(val ? 'show' : 'hide'); 
  }

}
