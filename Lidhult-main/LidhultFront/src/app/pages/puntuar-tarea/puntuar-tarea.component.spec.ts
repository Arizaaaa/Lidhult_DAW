import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuntuarTareaComponent } from './puntuar-tarea.component';

describe('PuntuarTareaComponent', () => {
  let component: PuntuarTareaComponent;
  let fixture: ComponentFixture<PuntuarTareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PuntuarTareaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PuntuarTareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
