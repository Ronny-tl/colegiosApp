import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  listAdmin = [
    '/panel/listarAlumnos',
    '/panel/listarCursos',
    '/panel/listarDocentes',
    '/panel/listarPagos',
    '/panel/listarApoderados',
    '/panel/listarPagosDocentes',
    '/panel/home'
  ]
  constructor(
    public router: Router
    ){

    }

    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if(sessionStorage.getItem('typeUser') == 'admin' && this.listAdmin.includes(state.url)){
          return true
        }
      this.router.navigate(['/']);
      return false;
    }
}
