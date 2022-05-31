import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewloanprofileComponent } from './newloanprofile.component';

describe('NewloanprofileComponent', () => {
  let component: NewloanprofileComponent;
  let fixture: ComponentFixture<NewloanprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewloanprofileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewloanprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
