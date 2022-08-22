import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  listAdmin = [
    '/panel',
    '/panel/listarAlumnos',
    '/panel/listarCursos',
    '/panel/listarDocentes',
    '/panel/listarPagos',
    '/panel/listarApoderados',
    '/panel/listarPagosDocentes',
    '/panel/home'
  ]

  listAlumno = [
    '/panel',
    '/panel/listarMisCursos'
  ]

  listApoderado = [
    '/panel',
    '/panel/listarMisPagos'
  ]
  constructor(
    public router: Router
    ){

    }

    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        let typeUser = sessionStorage.getItem('typeUser');
        console.log("TYPE USER", typeUser);
        
        if(!typeUser){
          this.router.navigate(['/']);
          return false;
        }else if(typeUser == 'admin' && this.listAdmin.includes(state.url)){
          return true;
        }else if(typeUser == 'alumno' && this.listAlumno.includes(state.url)){
          return true;
        }else if(typeUser == 'apoderado' && this.listApoderado.includes(state.url)){
          return true;
        }

      this.router.navigate(['/']);
      return false;
    }
}
