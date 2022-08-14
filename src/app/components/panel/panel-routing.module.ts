import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarAlumnosComponent } from './admin/listar-alumnos/listar-alumnos.component';
import { ListarApoderadoComponent } from './admin/listar-apoderado/listar-apoderado.component';
import { ListarCursosComponent } from './admin/listar-cursos/listar-cursos.component';
import { ListarDocentesComponent } from './admin/listar-docentes/listar-docentes.component';
import { ListarMatriculasComponent } from './admin/listar-matriculas/listar-matriculas.component';
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
      path:'listarMatriculas', component: ListarMatriculasComponent
    },
    {
      path:'listarApoderados', component: ListarApoderadoComponent
    }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelRoutingModule { }
