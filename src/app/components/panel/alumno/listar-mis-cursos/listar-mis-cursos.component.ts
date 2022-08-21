import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/shared/services/toast.service';
import { AlumnoService } from '../../services/alumno.service';
import { CursosService } from '../../services/cursos.service';
import { PagosService } from '../../services/pagos.service';


declare var $: any;
@Component({
  selector: 'app-listar-mis-cursos',
  templateUrl: './listar-mis-cursos.component.html',
  styleUrls: ['./listar-mis-cursos.component.scss']
})
export class ListarMisCursosComponent implements OnInit {

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
  precioCurso = 'precioCurso';
  monto = 'monto';


  operacion:string;
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
    this.getMisCursos();

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

  getMisCursos(){
    this.alumnoService.getMisCursos(sessionStorage.getItem('codigoAlumno')).subscribe(response => {
      this.listData = response;
    })
  }







 





}
