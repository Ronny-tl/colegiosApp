import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarAlumnosComponent } from './admin/listar-alumnos/listar-alumnos.component';
import { ListarApoderadoComponent } from './admin/listar-apoderado/listar-apoderado.component';
import { ListarCursosComponent } from './admin/listar-cursos/listar-cursos.component';
import { ListarDocentesComponent } from './admin/listar-docentes/listar-docentes.component';
import { ListarPagosComponent } from './admin/listar-pagos/listar-pagos.component';
import { ListarMisCursosComponent } from './alumno/listar-mis-cursos/listar-mis-cursos.component';
import { ListarMisPagosComponent } from './apoderado/listar-mis-pagos/listar-mis-pagos.component';
import { ListarMisCursosAsignadosComponent } from './docente/listar-mis-cursos/listar-mis-cursos.component';
import { ListarMisPagosHonorariosComponent } from './docente/listar-mis-pagos/listar-mis-pagos.component';
import { PanelComponent } from './panel.component';

const routes: Routes = [
  {path: '', component: PanelComponent, children: [
    {
      path:'listarAlumnos', component: ListarAlumnosComponent
    },
    {
      path:'listarCursos', component: ListarCursosComponent
    },
    {
      path:'listarDocentes', component: ListarDocentesComponent
    },
    {
      path:'listarPagos', component: ListarPagosComponent
    },
    {
      path:'listarApoderados', component: ListarApoderadoComponent
    },
    // Alumno
    {
      path:'listarMisCursos', component: ListarMisCursosComponent
    },
    // Apoderado
    {
      path:'listarMisPagos', component: ListarMisPagosComponent
    },
    // Docente
    {
      path:'listarMisCursosAsignados', component: ListarMisCursosAsignadosComponent
    },
    {
      path:'listarMisHonorarios', component: ListarMisPagosHonorariosComponent
    },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelRoutingModule { }
