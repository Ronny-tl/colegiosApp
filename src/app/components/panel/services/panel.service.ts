import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PanelService {

  constructor() { 

  }

  getListSideBar(typeUser: string){
    if(typeUser == 'admin'){
      return [
        {
          titulo: 'Home', 
          icon: 'fas fa-home',
          ruta: '/panel/home'
        },
        {
          titulo: 'Alumnos', 
          icon: 'fas fa-users',
          ruta: '/panel/listarAlumnos'
        },
        {
          titulo: 'Docentes', 
          icon: 'fas fa-chalkboard-teacher',
          ruta: '/panel/listarDocentes'
        },
        {
          titulo: 'Cursos', 
          icon: 'fas fa-book',
          ruta: '/panel/listarCursos'
        },
        {
          titulo: 'Apoderados', 
          icon: 'fas fa-user-tie',
          ruta: '/panel/listarApoderados'
        },
        {
          titulo: 'Registrar Pago', 
          icon: 'fas fa-list',
          ruta: '/panel/listarPagos'
        },
        {
          titulo: 'Pago Docentes', 
          icon: 'fas fa-list',
          ruta: '/panel/listarPagosDocentes'
        }
      ]
    }else if(typeUser == 'alumno'){
      return [
        {
          titulo: 'Mis Cursos', 
          icon: 'fas fa-list',
          ruta: '/panel/listarMisCursos'
        },
      ]
    }else if(typeUser == 'apoderado'){
      return [
        {
          titulo: 'Mis Pagos', 
          icon: 'fas fa-money-bill',
          ruta: '/panel/listarMisPagos'
        },
      ]
    }
    else if(typeUser == 'docente'){
      return [
        {
          titulo: 'Mis Cursos', 
          icon: 'fas fa-book',
          ruta: '/panel/listarMisCursosAsignados'
        },
        {
          titulo: 'Mis Honorarios', 
          icon: 'fas fa-money-bill',
          ruta: '/panel/listarMisHonorarios'
        }
      ]
    }
    else{
      return [];
    }

    
  }
}
