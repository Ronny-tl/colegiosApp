import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'loginAdmin', loadChildren: () => import ('./components/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'loginAlumno', loadChildren: () => import ('./components/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'loginDocente', loadChildren: () => import ('./components/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'loginTutor', loadChildren: () => import ('./components/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'panel', loadChildren: () => import('./components/panel/panel.module').then(m => m.PanelModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
