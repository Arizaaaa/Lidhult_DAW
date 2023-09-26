import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TareasAlumnosComponent } from './tareas-alumnos.component';

describe('TareasAlumnosComponent', () => {
  let component: TareasAlumnosComponent;
  let fixture: ComponentFixture<TareasAlumnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TareasAlumnosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TareasAlumnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
