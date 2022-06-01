import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LenderContactsComponent } from './lender-contacts.component';

describe('LenderContactsComponent', () => {
  let component: LenderContactsComponent;
  let fixture: ComponentFixture<LenderContactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LenderContactsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LenderContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
