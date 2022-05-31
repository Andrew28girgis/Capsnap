import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntakevaluesComponent } from './intakevalues.component';

describe('IntakevaluesComponent', () => {
  let component: IntakevaluesComponent;
  let fixture: ComponentFixture<IntakevaluesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntakevaluesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntakevaluesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
