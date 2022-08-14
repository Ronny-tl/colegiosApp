import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guard/auth.guard';
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
      path:'listarAlumnos', component: ListarAlumnosComponent, canActivate: [AuthGuard]
    },
    {
      path:'listarCursos', component: ListarCursosComponent, canActivate: [AuthGuard]
    },
    {
      path:'listarDocentes', component: ListarDocentesComponent , canActivate: [AuthGuard]
    },
    {
      path:'listarPagos', component: ListarPagosComponent , canActivate: [AuthGuard]
    },
    {
      path:'listarApoderados', component: ListarApoderadoComponent , canActivate: [AuthGuard]
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
