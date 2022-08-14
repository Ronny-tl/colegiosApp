import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanelRoutingModule } from './panel-routing.module';
import { PanelComponent } from './panel.component';
import { ListarDocentesComponent } from './admin/listar-docentes/listar-docentes.component';
import { ListarCursosComponent } from './admin/listar-cursos/listar-cursos.component';
import { ListarApoderadoComponent } from './admin/listar-apoderado/listar-apoderado.component';
import { ListarMatriculasComponent } from './admin/listar-matriculas/listar-matriculas.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    PanelComponent,
    ListarDocentesComponent,
    ListarCursosComponent,
    ListarApoderadoComponent,
    ListarMatriculasComponent,
    
  ],
  imports: [
    CommonModule,
    PanelRoutingModule,
    RouterModule,
  
  ]
})
export class PanelModule { }
