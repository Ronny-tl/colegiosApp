import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ToastService } from 'src/app/shared/services/toast.service';
import { DocenteService } from '../../services/docente.service';

declare var $: any;
@Component({
  selector: 'app-listar-docentes',
  templateUrl: './listar-docentes.component.html',
  styleUrls: ['./listar-docentes.component.scss']
})
export class ListarDocentesComponent implements OnInit {

  listData:any[] = [];
  formDocente:FormGroup;

  codigoProfesor = 'codigoProfesor';
  nombres = 'nombres';
  apellidos = 'apellidos';
  tipoDocumento = 'tipoDocumento';
  numDocumento = 'numDocumento';

  operacion:string;
  constructor(
    private alumnoService: DocenteService,
    private _fb:FormBuilder,
    private toastService: ToastService
  ) { 
    this.crearFormulario();
  }

  ngOnInit(): void {
    this.getDocentes();

  }

  crearFormulario(){
    this.formDocente = this._fb.group({
      [this.codigoProfesor]: [null],
      [this.nombres]: [null, [Validators.required]],
      [this.apellidos]: [null, [Validators.required]],
      [this.tipoDocumento]: [null, [Validators.required]],
      [this.numDocumento]: [null, [Validators.required]],
    })
  }

  getDocentes(){
    this.alumnoService.getDocentes().subscribe(response => {
      this.listData = response;
    })
  }


  openModalDocente(val: boolean){
    $('#modalDocente').modal(val ? 'show' : 'hide'); 
  }

  openModalEditar(item){
    this.operacion = 'Editar'
    this.formDocente.patchValue({
      [this.codigoProfesor]: item.codigoProfesor,
      [this.nombres]: item.nombres ,
      [this.apellidos]: item.apellidos ,
      [this.tipoDocumento]: item.tipoDocumento,
      [this.numDocumento]: item.numDocumento,
    })
    
    this.openModalDocente(true);
  }

  editar(){
    let data = {...this.formDocente.value}
    console.log("ANTES DE ENVIAR", data);
    data.codigoProfesor = Number(data.codigoProfesor);
    this.alumnoService.updateDocente(data).subscribe(response => {
      console.log("RESPONSE UPDATE", response);
      this.toastService.toast('success', 'Exito', 'Docente actualizado exitosamente');
      this.getDocentes();
      this.openModalDocente(false);
    },err => {
      console.log(err);
      this.toastService.toast('error', 'Error', 'Ocurrio un problema por favor pongase en contacto con el administrador');
    })
  }
  agregar(){
    this.formDocente.get(this.codigoProfesor).reset();
    let data = {...this.formDocente.value}
    data.codigoProfesor = Number(data.codigoProfesor);
    data.fechaNacimiento = moment(new Date(data.fechaNacimiento)).format('YYYY-MM-DD')
    this.alumnoService.setDocentes(data).subscribe(response => {
      console.log("RESPONSE", response);
      this.toastService.toast('success', 'Exito', 'Docente agregado exitosamente');
      this.getDocentes();
      this.openModalDocente(false);
    },err => {
      console.log(err);
      this.toastService.toast('error', 'Error', 'Ocurrio un problema por favor pongase en contacto con el administrador');
    })
  }

  eliminar(item){
    this.alumnoService.deleteDocente(item.codigoProfesor).subscribe(response => {
      this.toastService.toast('success', 'Exito', 'Docente eliminado exitosamente');
      this.getDocentes();
    },err => {
      console.log(err);
      this.toastService.toast('error', 'Error', 'Ocurrio un problema por favor pongase en contacto con el administrador');
    })
  }


}
