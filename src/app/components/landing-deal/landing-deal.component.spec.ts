import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingDealComponent } from './landing-deal.component';

describe('LandingDealComponent', () => {
  let component: LandingDealComponent;
  let fixture: ComponentFixture<LandingDealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingDealComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingDealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
