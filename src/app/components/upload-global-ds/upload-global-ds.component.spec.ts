import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadGlobalDsComponent } from './upload-global-ds.component';

describe('UploadGlobalDsComponent', () => {
  let component: UploadGlobalDsComponent;
  let fixture: ComponentFixture<UploadGlobalDsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadGlobalDsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadGlobalDsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
