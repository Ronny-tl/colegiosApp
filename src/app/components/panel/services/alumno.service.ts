import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
  urlBase = environment.urlBackend;
  constructor(private _http: HttpClient) { }

  getAlumnos(): Observable<any>{
    return this._http.get<any[]>(`${this.urlBase}alumnos/`)
  }

  getApoderados(): Observable<any>{
    return this._http.get<any[]>(`${this.urlBase}tutor`)
  }

  setAlumno(dataJson): Observable<any>{
    return this._http.post(`${this.urlBase}alumnos/`, dataJson)
  }

  updateAlumno(dataJson): Observable<any>{
    return this._http.put(`${this.urlBase}alumnos/${dataJson.codigoAlumno}/`, dataJson)
  }

  deleteAlumno(codigoAlumno){
    return this._http.delete(`${this.urlBase}alumnos/${codigoAlumno}/`)
  }


  // REGISTRO ALUMNO PRINCIPAL

  setAlumnoGlobal(dataJson): Observable<any>{
    return this._http.post(`${this.urlBase}alumnoRegister`, dataJson)
  }

  // LISTAR MIS CURSOS

  getMisCursos(codigoAlumno): Observable<any>{
    return this._http.get<any[]>(`${this.urlBase}misCursos`, {params:{codigoAlumno: codigoAlumno}})
  }
}
