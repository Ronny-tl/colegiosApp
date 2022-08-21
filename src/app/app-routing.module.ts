import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule)
  },
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
    path: 'loginApoderado', loadChildren: () => import ('./components/login/login.module').then(m => m.LoginModule)
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
