import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanelRoutingModule } from './panel-routing.module';
import { PanelComponent } from './panel.component';
import { ListarDocentesComponent } from './admin/listar-docentes/listar-docentes.component';
import { ListarCursosComponent } from './admin/listar-cursos/listar-cursos.component';
import { ListarApoderadoComponent } from './admin/listar-apoderado/listar-apoderado.component';

import { RouterModule } from '@angular/router';
import { ListarMisCursosComponent } from './alumno/listar-mis-cursos/listar-mis-cursos.component';
import { ListarMisPagosComponent } from './apoderado/listar-mis-pagos/listar-mis-pagos.component';
import { BrowserModule } from '@angular/platform-browser';
import { ListarAlumnosComponent } from './admin/listar-alumnos/listar-alumnos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ListarPagosComponent } from './admin/listar-pagos/listar-pagos.component';
import { ListarPagosDocentesComponent } from './admin/listar-pagos-docentes/listar-pagos-docentes.component';
import { HomeComponent } from './admin/home/home.component';


@NgModule({
  declarations: [
    PanelComponent,
    ListarDocentesComponent,
    ListarCursosComponent,
    ListarApoderadoComponent,
    ListarMisCursosComponent,
    ListarMisPagosComponent,
    ListarAlumnosComponent,
    ListarPagosComponent,
    ListarPagosDocentesComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    PanelRoutingModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class PanelModule { }
