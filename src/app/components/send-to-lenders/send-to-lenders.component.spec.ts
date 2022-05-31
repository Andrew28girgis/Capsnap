import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendToLendersComponent } from './send-to-lenders.component';

describe('SendToLendersComponent', () => {
  let component: SendToLendersComponent;
  let fixture: ComponentFixture<SendToLendersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendToLendersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendToLendersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
