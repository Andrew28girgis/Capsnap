import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanProfileDetailsComponent } from './loan-profile-details.component';

describe('LoanProfileDetailsComponent', () => {
  let component: LoanProfileDetailsComponent;
  let fixture: ComponentFixture<LoanProfileDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanProfileDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanProfileDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
