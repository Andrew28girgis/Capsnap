import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LendersdetailsComponent } from './lendersdetails.component';

describe('LendersdetailsComponent', () => {
  let component: LendersdetailsComponent;
  let fixture: ComponentFixture<LendersdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LendersdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LendersdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
