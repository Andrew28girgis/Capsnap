import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LendersLoanprofileComponent } from './lenders-loanprofile.component';

describe('LendersLoanprofileComponent', () => {
  let component: LendersLoanprofileComponent;
  let fixture: ComponentFixture<LendersLoanprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LendersLoanprofileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LendersLoanprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
