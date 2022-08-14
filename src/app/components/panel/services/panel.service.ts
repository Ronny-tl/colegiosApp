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
          titulo: 'Matriculas', 
          icon: 'fas fa-list',
          ruta: '/panel/listarMatriculas'
        }
      ]
    }else{
      return [];
    }

    
  }
}
