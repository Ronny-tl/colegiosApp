import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ToastService } from 'src/app/shared/services/toast.service';
import { AlumnoService } from '../../services/alumno.service';

declare var $: any;
@Component({
  selector: 'app-listar-alumnos',
  templateUrl: './listar-alumnos.component.html',
  styleUrls: ['./listar-alumnos.component.scss']
})
export class ListarAlumnosComponent implements OnInit {
  listAlumnos:any[] = [];
  listApoderado:any[] = [];
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

  operacion:string;
  constructor(
    private alumnoService: AlumnoService,
    private _fb:FormBuilder,
    private toastService: ToastService
  ) { 
    this.crearFormulario();
  }

  ngOnInit(): void {
    this.getAlumnos();
    this.getApoderados();
  }

  crearFormulario(){
    this.formAlumno = this._fb.group({
      [this.codigoAlumno]: [null],
      [this.codigoTutor]: [null, [Validators.required]],
      [this.nombres]: [null, [Validators.required]],
      [this.apellidos]: [null, [Validators.required]],
      [this.direccion]: [null, [Validators.required]],
      [this.fechaNacimiento]: [null, [Validators.required]],
      [this.tipoDocumento]: [null, [Validators.required]],
      [this.numDocumento]: [null, [Validators.required]],
      [this.telefono]: [null, [Validators.required]],
      [this.correo]: [null, [Validators.required]],
      [this.password]: [null],
      [this.alumnoVerificado]: [false, [Validators.required]]
    })
  }

  getAlumnos(){
    this.alumnoService.getAlumnos().subscribe(response => {
      console.log("ALUMNOS",response);
      this.listAlumnos = response;
    })
  }

  getApoderados(){
    this.alumnoService.getApoderados().subscribe(response => {
      console.log("APODERADOS", response);
      this.listApoderado = response;
      
    })
  }

  openModalAlumno(val: boolean){
    $('#modalAlumno').modal(val ? 'show' : 'hide'); 
  }

  openModalEditar(item){
    this.operacion = 'Editar'
    this.formAlumno.patchValue({
      [this.codigoAlumno]: item.codigoAlumno,
      [this.codigoTutor]: item.codigoTutor,
      [this.nombres]: item.nombres ,
      [this.apellidos]: item.apellidos ,
      [this.direccion]: item.direccion,
      [this.fechaNacimiento]: item.fechaNacimiento,
      [this.tipoDocumento]: item.tipoDocumento,
      [this.numDocumento]: item.numDocumento,
      [this.telefono]: item.telefono,
      [this.correo]: item.correo,
      [this.password]: item.password,
      [this.alumnoVerificado]: item.alumnoVerificado
    })
    console.log(this.formAlumno);
    this.openModalAlumno(true);
  }

  editar(){
    let data = {...this.formAlumno.value}
    console.log("ANTES DE ENVIAR", data);
    
    data.codigoTutor = Number(data.codigoTutor);
    data.fechaNacimiento = moment(new Date(data.fechaNacimiento)).format('YYYY-MM-DD')
    this.alumnoService.updateAlumno(data).subscribe(response => {
      console.log("RESPONSE UPDATE", response);
      this.toastService.toast('success', 'Exito', 'Alumno actualizado exitosamente');
      this.getAlumnos();
      this.openModalAlumno(false);
    },err => {
      console.log(err);
      this.toastService.toast('error', 'Error', 'Ocurrio un problema por favor pongase en contacto con el administrador');
    })
  }
  agregar(){
    this.formAlumno.get(this.codigoAlumno).reset();
    let data = {...this.formAlumno.value}
    data.codigoTutor = Number(data.codigoTutor);
    data.fechaNacimiento = moment(new Date(data.fechaNacimiento)).format('YYYY-MM-DD')
    data.password = data.numDocumento;
    this.alumnoService.setAlumno(data).subscribe(response => {
      console.log("RESPONSE", response);
      this.toastService.toast('success', 'Exito', 'Alumno agregado exitosamente');
      this.getAlumnos();
      this.openModalAlumno(false);
    },err => {
      console.log(err);
      this.toastService.toast('error', 'Error', 'Ocurrio un problema por favor pongase en contacto con el administrador');
    })
  }

  eliminar(item){
    this.alumnoService.deleteAlumno(item.codigoAlumno).subscribe(response => {
      this.toastService.toast('success', 'Exito', 'Alumno eliminado exitosamente');
      this.getAlumnos();
    },err => {
      console.log(err);
      this.toastService.toast('error', 'Error', 'Ocurrio un problema por favor pongase en contacto con el administrador');
    })
  }


}
