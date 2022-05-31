import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailToMicrodealComponent } from './mail-to-microdeal.component';

describe('MailToMicrodealComponent', () => {
  let component: MailToMicrodealComponent;
  let fixture: ComponentFixture<MailToMicrodealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MailToMicrodealComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MailToMicrodealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
