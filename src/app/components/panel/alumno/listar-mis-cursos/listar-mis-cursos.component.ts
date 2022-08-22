import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/shared/services/toast.service';
import { AlumnoService } from '../../services/alumno.service';
import { CursosService } from '../../services/cursos.service';
import { PagosService } from '../../services/pagos.service';

import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
declare var $: any;
@Component({
  selector: 'app-listar-mis-cursos',
  templateUrl: './listar-mis-cursos.component.html',
  styleUrls: ['./listar-mis-cursos.component.scss']
})
export class ListarMisCursosComponent implements OnInit {

  @ViewChild('content', { 'static': true}) content:ElementRef;
  
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

  dataAlumno:any;
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




  generarPDF() {

    const div = document.getElementById('content');
    const options = {
      background: 'white',
      scale: 3
    };

    html2canvas(div, options).then((canvas) => {

      var img = canvas.toDataURL("image/PNG");
      var doc = new jsPDF('p', 'mm', 'a4', true);

      const bufferX = 5;
      const bufferY = 5;
      const imgProps = (<any>doc).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');

      return doc;
    }).then((doc) => {
      doc.save("MisCursos-"+(new Date().getTime().toString())+'.pdf');  
    });
  }
 



}
