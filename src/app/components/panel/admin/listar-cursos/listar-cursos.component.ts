import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ToastService } from 'src/app/shared/services/toast.service';
import { CursosService } from '../../services/cursos.service';
import { DocenteService } from '../../services/docente.service';

declare var $: any;
@Component({
  selector: 'app-listar-cursos',
  templateUrl: './listar-cursos.component.html',
  styleUrls: ['./listar-cursos.component.scss']
})
export class ListarCursosComponent implements OnInit {

  listData:any[] = [];
  listDocentes:any[] = [];
  formCurso:FormGroup;

  codigoCurso = 'codigoCurso';
  nombre = 'nombre';
  precio = 'precio';
  codigoProfesor = 'codigoProfesor';
  fechaInicio = 'fechaInicio';
  fechaFin = 'fechaFin'

  operacion:string;
  constructor(
    private alumnoService: CursosService,
    private _fb:FormBuilder,
    private toastService: ToastService,
    private docentesService: DocenteService
  ) { 
    this.crearFormulario();
  }

  ngOnInit(): void {
    this.getCursos();
    this.getDocentes();
  }

  crearFormulario(){
    this.formCurso = this._fb.group({
      [this.codigoCurso]: [null],
      [this.nombre]: [null, [Validators.required]],
      [this.precio]: [null, [Validators.required]],
      [this.codigoProfesor]: [null, [Validators.required]],
      [this.fechaInicio]: [null, [Validators.required]],
      [this.fechaFin]: [null, [Validators.required]],
    })
  }

  getCursos(){
    this.alumnoService.getCursos().subscribe(response => {
      this.listData = response;
    })
  }

  getDocentes(){
    this.docentesService.getDocentes().subscribe(response => {
      this.listDocentes = response;
    })
  }


  openModalCurso(val: boolean){
    $('#modalDocente').modal(val ? 'show' : 'hide'); 
  }

  openModalEditar(item){
    this.operacion = 'Editar'
    this.formCurso.patchValue({
      [this.codigoCurso]: item.codigoCurso,
      [this.nombre]: item.nombre ,
      [this.precio]: item.precio ,
      [this.codigoProfesor]: item.codigoProfesor,
      [this.fechaInicio]: item.fechaInicio,
      [this.fechaFin]: item.fechaFin,
    })
    
    this.openModalCurso(true);
  }

  editar(){
    let data = {...this.formCurso.value}
    console.log("ANTES DE ENVIAR", data);
    data.codigoCurso = Number(data.codigoCurso);
    data.codigoProfesor = Number(data.codigoProfesor);
    data.fechaInicio = moment(new Date(data.fechaInicio)).format('YYYY-MM-DD')
    data.fechaFin = moment(new Date(data.fechaFin)).format('YYYY-MM-DD')
    this.alumnoService.updateCurso(data).subscribe(response => {
      console.log("RESPONSE UPDATE", response);
      this.toastService.toast('success', 'Exito', 'Curso actualizado exitosamente');
      this.getCursos();
      this.openModalCurso(false);
    },err => {
      console.log(err);
      this.toastService.toast('error', 'Error', 'Ocurrio un problema por favor pongase en contacto con el administrador');
    })
  }
  agregar(){
    this.formCurso.get(this.codigoCurso).reset();
    let data = {...this.formCurso.value}
    data.codigoCurso = Number(data.codigoCurso);
    data.codigoProfesor = Number(data.codigoProfesor);
    data.fechaInicio = moment(new Date(data.fechaInicio)).format('YYYY-MM-DD')
    data.fechaFin = moment(new Date(data.fechaFin)).format('YYYY-MM-DD')
    this.alumnoService.setCurso(data).subscribe(response => {
      console.log("RESPONSE", response);
      this.toastService.toast('success', 'Exito', 'Curso agregado exitosamente');
      this.getCursos();
      this.openModalCurso(false);
    },err => {
      console.log(err);
      this.toastService.toast('error', 'Error', 'Ocurrio un problema por favor pongase en contacto con el administrador');
    })
  }

  eliminar(item){
    this.alumnoService.deleteCurso(item.codigoCurso).subscribe(response => {
      this.toastService.toast('success', 'Exito', 'Curso eliminado exitosamente');
      this.getCursos();
    },err => {
      console.log(err);
      this.toastService.toast('error', 'Error', 'Ocurrio un problema por favor pongase en contacto con el administrador');
    })
  }



}
