import { Component, OnInit } from '@angular/core';

declare var $: any;
@Component({
  selector: 'app-listar-alumnos',
  templateUrl: './listar-alumnos.component.html',
  styleUrls: ['./listar-alumnos.component.scss']
})
export class ListarAlumnosComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  openModalAlumno(val: boolean){
    $('#modalAlumno').modal(val ? 'show' : 'hide'); 
  }

}
