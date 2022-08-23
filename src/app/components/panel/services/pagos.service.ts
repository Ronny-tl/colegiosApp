import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PagosService {

  urlBase = environment.urlBackend;
  
  constructor(private _http: HttpClient) { }

  getPagos(): Observable<any>{
    return this._http.get<any[]>(`${this.urlBase}pagos/`)
  }

  setPagos(dataJson): Observable<any>{
    return this._http.post(`${this.urlBase}pagos/`, dataJson)
  }

  updatePago(dataJson): Observable<any>{
    return this._http.put(`${this.urlBase}pagos/${dataJson.codigoRegistro}/`, dataJson)
  }

  deletePago(codigoRegistro): Observable<any>{
    return this._http.delete(`${this.urlBase}pagos/${codigoRegistro}/`)
  }
  
  ///PAGOS DOCENTES

  getPagosDocentes(): Observable<any>{
    return this._http.get<any[]>(`${this.urlBase}honorarios/`)
  }

  setPagosDocentes(dataJson): Observable<any>{
    return this._http.post(`${this.urlBase}honorarios/`, dataJson)
  }

  updatePagoDocentes(dataJson): Observable<any>{
    return this._http.put(`${this.urlBase}honorarios/${dataJson.codigoHonorario}/`, dataJson)
  }

  deletePagoDocentes(codigoHonorario){
    return this._http.delete(`${this.urlBase}honorarios/${codigoHonorario}/`)
  }


  //DETALLES

  getDetail(): Observable<any>{
    return this._http.get<any[]>(`${this.urlBase}detail`)
  }
}
