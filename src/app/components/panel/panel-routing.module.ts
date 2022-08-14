import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarAlumnosComponent } from './admin/listar-alumnos/listar-alumnos.component';
import { PanelComponent } from './panel.component';

const routes: Routes = [
  {path: '', component: PanelComponent, children: [
    {
      path:'listarAlumnos', component: ListarAlumnosComponent
    }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelRoutingModule { }
