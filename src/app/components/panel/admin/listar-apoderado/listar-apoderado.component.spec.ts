import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarApoderadoComponent } from './listar-apoderado.component';

describe('ListarApoderadoComponent', () => {
  let component: ListarApoderadoComponent;
  let fixture: ComponentFixture<ListarApoderadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarApoderadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarApoderadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
