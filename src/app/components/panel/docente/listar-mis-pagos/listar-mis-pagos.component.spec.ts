import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarMisPagosComponent } from './listar-mis-pagos.component';

describe('ListarMisPagosComponent', () => {
  let component: ListarMisPagosComponent;
  let fixture: ComponentFixture<ListarMisPagosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarMisPagosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarMisPagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
