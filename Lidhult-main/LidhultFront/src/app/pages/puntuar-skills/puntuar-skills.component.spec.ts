import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuntuarSkillsComponent } from './puntuar-skills.component';

describe('PuntuarSkillsComponent', () => {
  let component: PuntuarSkillsComponent;
  let fixture: ComponentFixture<PuntuarSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PuntuarSkillsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PuntuarSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
