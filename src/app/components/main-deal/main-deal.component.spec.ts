import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainDealComponent } from './main-deal.component';

describe('MainDealComponent', () => {
  let component: MainDealComponent;
  let fixture: ComponentFixture<MainDealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainDealComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainDealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
