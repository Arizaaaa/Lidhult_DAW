import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialInsigniasComponent } from './historial-insignias.component';

describe('HistorialInsigniasComponent', () => {
  let component: HistorialInsigniasComponent;
  let fixture: ComponentFixture<HistorialInsigniasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorialInsigniasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialInsigniasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
