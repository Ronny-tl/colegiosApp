import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarPagosDocentesComponent } from './listar-pagos-docentes.component';

describe('ListarPagosDocentesComponent', () => {
  let component: ListarPagosDocentesComponent;
  let fixture: ComponentFixture<ListarPagosDocentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarPagosDocentesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarPagosDocentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
