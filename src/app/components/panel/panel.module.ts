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


@NgModule({
  declarations: [
    PanelComponent,
    ListarDocentesComponent,
    ListarCursosComponent,
    ListarApoderadoComponent,
    ListarMisCursosComponent,
    ListarMisPagosComponent,
    
  ],
  imports: [
    CommonModule,
    PanelRoutingModule,
    RouterModule,
  
  ]
})
export class PanelModule { }
