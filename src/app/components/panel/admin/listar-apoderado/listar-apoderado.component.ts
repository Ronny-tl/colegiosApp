import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ToastService } from 'src/app/shared/services/toast.service';
import { ApoderadoService } from '../../services/apoderado.service';

declare var $: any;
@Component({
  selector: 'app-listar-apoderado',
  templateUrl: './listar-apoderado.component.html',
  styleUrls: ['./listar-apoderado.component.scss']
})
export class ListarApoderadoComponent implements OnInit {


  listData:any[] = [];
  formApoderado:FormGroup;

  codigoTutor = 'codigoTutor';
  nombres = 'nombres';
  apellidos = 'apellidos';
  tipoDocumento = 'tipoDocumento';
  numDocumento = 'numDocumento';

  operacion:string;
  constructor(
    private apoderadoService: ApoderadoService,
    private _fb:FormBuilder,
    private toastService: ToastService
  ) { 
    this.crearFormulario();
  }

  ngOnInit(): void {
    this.getApoderados();

  }

  crearFormulario(){
    this.formApoderado = this._fb.group({
      [this.codigoTutor]: [null],
      [this.nombres]: [null, [Validators.required]],
      [this.apellidos]: [null, [Validators.required]],
      [this.tipoDocumento]: [null, [Validators.required]],
      [this.numDocumento]: [null, [Validators.required]],
    })
  }

  getApoderados(){
    this.apoderadoService.getApoderados().subscribe(response => {
      this.listData = response;
    })
  }


  openModalApoderado(val: boolean){
    $('#modalApoderado').modal(val ? 'show' : 'hide'); 
  }

  openModalEditar(item){
    this.operacion = 'Editar'
    this.formApoderado.patchValue({
      [this.codigoTutor]: item.codigoTutor,
      [this.nombres]: item.nombres ,
      [this.apellidos]: item.apellidos ,
      [this.tipoDocumento]: item.tipoDocumento,
      [this.numDocumento]: item.numDocumento,
    })
    
    this.openModalApoderado(true);
  }

  editar(){
    let data = {...this.formApoderado.value}
    console.log("ANTES DE ENVIAR", data);
    data.codigoTutor = Number(data.codigoTutor);
    this.apoderadoService.updateApoderado(data).subscribe(response => {
      console.log("RESPONSE UPDATE", response);
      this.toastService.toast('success', 'Exito', 'Apoderado actualizado exitosamente');
      this.getApoderados();
      this.openModalApoderado(false);
    },err => {
      console.log(err);
      this.toastService.toast('error', 'Error', 'Ocurrio un problema por favor pongase en contacto con el administrador');
    })
  }
  agregar(){
    this.formApoderado.get(this.codigoTutor).reset();
    let data = {...this.formApoderado.value}
    data.codigoTutor = Number(data.codigoTutor);
    this.apoderadoService.setApoderado(data).subscribe(response => {
      console.log("RESPONSE", response);
      this.toastService.toast('success', 'Exito', 'Apoderado agregado exitosamente');
      this.getApoderados();
      this.openModalApoderado(false);
    },err => {
      console.log(err);
      this.toastService.toast('error', 'Error', 'Ocurrio un problema por favor pongase en contacto con el administrador');
    })
  }

  eliminar(item){
    this.apoderadoService.deleteApoderado(item.codigoTutor).subscribe(response => {
      this.toastService.toast('success', 'Exito', 'Apoderado eliminado exitosamente');
      this.getApoderados();
    },err => {
      console.log(err);
      this.toastService.toast('error', 'Error', 'Ocurrio un problema por favor pongase en contacto con el administrador');
    })
  }


}
