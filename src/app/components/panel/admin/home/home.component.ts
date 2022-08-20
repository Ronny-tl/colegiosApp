import { Component, OnInit } from '@angular/core';
import { PagosService } from '../../services/pagos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  data:any;
  constructor(
    private detailService:PagosService
  ) { }

  ngOnInit(): void {
    this.getDetalle();
  }

  getDetalle(){
    this.detailService.getDetail().subscribe(response => {
      this.data = response;
      this.data.ganancias = response.montoTotalCursos - response.montoTotalHonorariosProfesores;
    })
  }
}
