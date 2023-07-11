import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUpdateSectionComponent } from './admin-update-section.component';

describe('AdminUpdateSectionComponent', () => {
  let component: AdminUpdateSectionComponent;
  let fixture: ComponentFixture<AdminUpdateSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminUpdateSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUpdateSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
