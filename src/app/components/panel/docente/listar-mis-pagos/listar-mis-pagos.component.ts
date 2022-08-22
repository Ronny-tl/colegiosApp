import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastService } from 'src/app/shared/services/toast.service';
import { AlumnoService } from '../../services/alumno.service';
import { CursosService } from '../../services/cursos.service';
import { DocenteService } from '../../services/docente.service';
import { PagosService } from '../../services/pagos.service';


import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';import * as moment from 'moment';
;
declare var $: any;
@Component({
  selector: 'app-listar-mis-pagos',
  templateUrl: './listar-mis-pagos.component.html',
  styleUrls: ['./listar-mis-pagos.component.scss']
})
export class ListarMisPagosHonorariosComponent implements OnInit {

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

  detalleRecibo:any;
  dataDocente:any;
  fechaActual = moment(new(Date)).format('DD/MM/YYYY')
  constructor(
    private pagoService: PagosService,
    private _fb:FormBuilder,
    private toastService: ToastService,
    private alumnoService: AlumnoService,
    private cursoService: CursosService,
    private docenteService: DocenteService,
    private spinner: NgxSpinnerService,
  ) { 
    this.crearFormulario();
  }

  ngOnInit(): void {
    this.getMisHonorarios();
    this.getDocenteById();
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
  
  getMisHonorarios(){
    this.docenteService.getMisHonorarios(sessionStorage.getItem('codigoProfesor')).subscribe(response => {
      this.listData = response;
    })
  }

  getDocenteById(){
    this.docenteService.getDocenteById(sessionStorage.getItem('codigoProfesor')).subscribe(response => {
      this.dataDocente = response;
    })
  }




  generarPDF() {
    this.spinner.show();
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
      this.spinner.hide();
      doc.save("MisCursos-"+(new Date().getTime().toString())+'.pdf');  
    });
  }
 
  miRecibo(item){
    this.detalleRecibo = item;
    this.openModal(true);
  }

  openModal(val: boolean){
    $('#modalRecibo').modal(val ? 'show' : 'hide'); 
  }

  generarRecibo() {
    this.spinner.show();
    const div = document.getElementById('content2');
    const options = {
      background: 'white',
      scale: 3
    };

    html2canvas(div, options).then((canvas) => {

      var img = canvas.toDataURL("image/PNG");
      var doc = new jsPDF('l', 'mm', 'a4', true);

      const bufferX = 5;
      const bufferY = 5;
      const imgProps = (<any>doc).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');

      return doc;
    }).then((doc) => {
      this.spinner.hide();
      doc.save("MiRecibo-"+(new Date().getTime().toString())+'.pdf');  
    });
  }



}
