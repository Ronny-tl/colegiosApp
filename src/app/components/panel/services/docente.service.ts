import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocenteService {
  urlBase = environment.urlBackend;
  constructor(private _http: HttpClient) { }

  getDocentes(): Observable<any>{
    return this._http.get<any[]>(`${this.urlBase}docentes/`)
  }

  setDocentes(dataJson): Observable<any>{
    return this._http.post(`${this.urlBase}docentes/`, dataJson)
  }

  updateDocente(dataJson): Observable<any>{
    return this._http.put(`${this.urlBase}docentes/${dataJson.codigoProfesor}/`, dataJson)
  }

  deleteDocente(codigoProfesor){
    return this._http.delete(`${this.urlBase}docentes/${codigoProfesor}/`)
  }
}
