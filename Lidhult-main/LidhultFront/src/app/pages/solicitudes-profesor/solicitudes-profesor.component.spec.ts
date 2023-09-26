import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudesProfesorComponent } from './solicitudes-profesor.component';

describe('SolicitudesProfesorComponent', () => {
  let component: SolicitudesProfesorComponent;
  let fixture: ComponentFixture<SolicitudesProfesorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitudesProfesorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitudesProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
