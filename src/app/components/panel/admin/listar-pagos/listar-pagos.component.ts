import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ToastService } from 'src/app/shared/services/toast.service';
import { AlumnoService } from '../../services/alumno.service';
import { CursosService } from '../../services/cursos.service';
import { PagosService } from '../../services/pagos.service';

declare var $: any;
@Component({
  selector: 'app-listar-pagos',
  templateUrl: './listar-pagos.component.html',
  styleUrls: ['./listar-pagos.component.scss']
})
export class ListarPagosComponent implements OnInit {

  listData:any[] = [];

  listCursos:any[] = [];
  listAlumnos:any[] = [];

  formPago:FormGroup;

  codigoRegistro = 'codigoRegistro';
  descripcion = 'descripcion';
  codigoAlumno = 'codigoAlumno';
  nombresAlumno = 'nombresAlumno';
  apellidosAlumno = 'apellidosAlumno';
  codigoCurso = 'codigoCurso';
  nombreCurso = 'nombreCurso';
  codigoProfesor = 'codigoProfesor';
  nombresProfesor = 'nombresProfesor';
  apellidosProfesor = 'apellidosProfesor';
  //precioCurso = 'precioCurso';
  monto = 'monto';


  operacion:string;
  precioCurso = '';
  constructor(
    private pagoService: PagosService,
    private _fb:FormBuilder,
    private toastService: ToastService,
    private alumnoService: AlumnoService,
    private cursoService: CursosService
  ) { 
    this.crearFormulario();
  }

  ngOnInit(): void {
    this.getPagos();
    this.getAlumnos();
    this.getCursos();
    this.valueChanges();
  }

  crearFormulario(){
    this.formPago = this._fb.group({
      [this.codigoRegistro]: [null],
      [this.descripcion]: [null, [Validators.required]],
      [this.codigoAlumno]: [null, [Validators.required]],
      [this.codigoCurso]: [null, [Validators.required]],
      [this.monto]: [null, [Validators.required]]
    })
  }

  valueChanges(){
    this.formPago.get(this.codigoCurso).valueChanges.subscribe(res => {
      if(res){ 
        this.precioCurso = this.listCursos.find(i => i.codigoCurso == res).precio;
      }
    })
  }

  getPagos(){
    this.pagoService.getPagos().subscribe(response => {
      this.listData = response;
    })
  }

  getAlumnos(){
    this.alumnoService.getAlumnos().subscribe(response => {
      this.listAlumnos = response;
    })
  }

  getCursos(){
    this.cursoService.getCursos().subscribe(response => {
      this.listCursos = response;
    })
  }


  openModalPago(val: boolean){
    this.precioCurso = '';
    $('#modalPago').modal(val ? 'show' : 'hide'); 
  }

  openModalEditar(item){
    console.log("ITEM ", item);
    
    this.operacion = 'Editar'
    this.formPago.patchValue({
      [this.codigoRegistro]: item.codigoRegistro,
      [this.descripcion]: item.descripcion ,
      [this.codigoAlumno]: item.codigoAlumno ,
      [this.codigoCurso]: item.codigoCurso,
      [this.monto]: item.monto,
    })
    this.openModalPago(true);
    
    this.precioCurso = item.precioCurso;
  }



  editar(){
    let data = {...this.formPago.value}
    console.log("ANTES DE ENVIAR", data);
    data.codigoAlumno = Number(data.codigoAlumno);
    data.codigoCurso = Number(data.codigoCurso);
    this.pagoService.updatePago(data).subscribe(response => {
      console.log("RESPONSE UPDATE", response);
      this.toastService.toast('success', 'Exito', 'Pago actualizado exitosamente');
      this.getPagos();
      this.openModalPago(false);
    },err => {
      console.log(err);
      this.toastService.toast('error', 'Error', 'Ocurrio un problema por favor pongase en contacto con el administrador');
    })
  }
  agregar(){
    this.formPago.get(this.codigoRegistro).reset();
    let data = {...this.formPago.value}
    data.codigoAlumno = Number(data.codigoAlumno);
    data.codigoCurso = Number(data.codigoCurso);
    // data.fechaNacimiento = moment(new Date(data.fechaNacimiento)).format('YYYY-MM-DD')
    this.pagoService.setPagos(data).subscribe(response => {
      console.log("RESPONSE", response);
      this.toastService.toast('success', 'Exito', 'Pago agregado exitosamente');
      this.getPagos();
      this.openModalPago(false);
    },err => {
      console.log(err);
      this.toastService.toast('error', 'Error', 'Ocurrio un problema por favor pongase en contacto con el administrador');
    })
  }

  eliminar(item){
    this.pagoService.deletePago(item.codigoProfesor).subscribe(response => {
      this.toastService.toast('success', 'Exito', 'Pago eliminado exitosamente');
      this.getPagos();
    },err => {
      console.log(err);
      this.toastService.toast('error', 'Error', 'Ocurrio un problema por favor pongase en contacto con el administrador');
    })
  }



}
