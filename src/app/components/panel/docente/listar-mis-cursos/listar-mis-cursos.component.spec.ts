import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarMisCursosComponent } from './listar-mis-cursos.component';

describe('ListarMisCursosComponent', () => {
  let component: ListarMisCursosComponent;
  let fixture: ComponentFixture<ListarMisCursosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarMisCursosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarMisCursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
