import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/shared/services/toast.service';
import { AlumnoService } from '../../services/alumno.service';
import { CursosService } from '../../services/cursos.service';
import { DocenteService } from '../../services/docente.service';
import { PagosService } from '../../services/pagos.service';


declare var $: any;
@Component({
  selector: 'app-listar-pagos-docentes',
  templateUrl: './listar-pagos-docentes.component.html',
  styleUrls: ['./listar-pagos-docentes.component.scss']
})
export class ListarPagosDocentesComponent implements OnInit {


  listData:any[] = [];

  listCursos:any[] = [];
  listDocentes:any[] = [];

  formPago:FormGroup;

  codigoHonorario = 'codigoHonorario';
  descripcion = 'descripcion';
  codigoAlumno = 'codigoAlumno';
  nombresAlumno = 'nombresAlumno';
  apellidosAlumno = 'apellidosAlumno';
  codigoCurso = 'codigoCurso';
  nombreCurso = 'nombreCurso';
  codigoProfesor = 'codigoProfesor';
  nombresProfesor = 'nombresProfesor';
  apellidosProfesor = 'apellidosProfesor';
  precioCurso = 'precioCurso';
  monto = 'monto';


  operacion:string;
  constructor(
    private pagoService: PagosService,
    private _fb:FormBuilder,
    private toastService: ToastService,
    private docenteService: DocenteService,
    private cursoService: CursosService
  ) { 
    this.crearFormulario();
  }

  ngOnInit(): void {
    this.getPagosDocentes();
    // this.getAlumnos();
    this.getDocentes();
  }

  crearFormulario(){
    this.formPago = this._fb.group({
      [this.codigoHonorario]: [null],
      [this.descripcion]: [null, [Validators.required]],
      [this.codigoProfesor]: [null, [Validators.required]],
      [this.monto]: [null, [Validators.required]]
    })
  }

  getPagosDocentes(){
    this.pagoService.getPagosDocentes().subscribe(response => {
      this.listData = response;
    })
  }

  getDocentes(){
    this.docenteService.getDocentes().subscribe(response => {
      this.listDocentes = response;
    })
  }

  // getCursos(){
  //   this.cursoService.getCursos().subscribe(response => {
  //     this.listCursos = response;
  //   })
  // }


  openModalPago(val: boolean){
    $('#modalPago').modal(val ? 'show' : 'hide'); 
  }

  openModalEditar(item){
    console.log("ITEM ", item);
    
    this.operacion = 'Editar'
    this.formPago.patchValue({
      [this.codigoHonorario]: item.codigoHonorario,
      [this.descripcion]: item.descripcion ,
      [this.codigoAlumno]: item.codigoAlumno ,
      [this.codigoCurso]: item.codigoCurso,
      [this.monto]: item.monto,
    })
    
    this.openModalPago(true);
  }

  editar(){
    let data = {...this.formPago.value}
    console.log("ANTES DE ENVIAR", data);
    data.codigoProfesor = Number(data.codigoProfesor);
    this.pagoService.updatePagoDocentes(data).subscribe(response => {
      console.log("RESPONSE UPDATE", response);
      this.toastService.toast('success', 'Exito', 'Pago docente actualizado exitosamente');
      this.getPagosDocentes();
      this.openModalPago(false);
    },err => {
      console.log(err);
      this.toastService.toast('error', 'Error', 'Ocurrio un problema por favor pongase en contacto con el administrador');
    })
  }
  agregar(){
    this.formPago.get(this.codigoHonorario).reset();
    let data = {...this.formPago.value}
    data.codigoProfesor = Number(data.codigoProfesor);
    // data.codigoCurso = Number(data.codigoCurso);
    // data.fechaNacimiento = moment(new Date(data.fechaNacimiento)).format('YYYY-MM-DD')
    this.pagoService.setPagosDocentes(data).subscribe(response => {
      console.log("RESPONSE", response);
      this.toastService.toast('success', 'Exito', 'Pago docente agregado exitosamente');
      this.getPagosDocentes();
      this.openModalPago(false);
    },err => {
      console.log(err);
      this.toastService.toast('error', 'Error', 'Ocurrio un problema por favor pongase en contacto con el administrador');
    })
  }

  eliminar(item){
    this.pagoService.deletePago(item.codigoProfesor).subscribe(response => {
      this.toastService.toast('success', 'Exito', 'Pago docente eliminado exitosamente');
      this.getPagosDocentes();
    },err => {
      console.log(err);
      this.toastService.toast('error', 'Error', 'Ocurrio un problema por favor pongase en contacto con el administrador');
    })
  }
}
