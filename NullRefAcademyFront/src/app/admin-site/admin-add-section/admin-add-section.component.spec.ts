import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddSectionComponent } from './admin-add-section.component';

describe('AdminAddSectionComponent', () => {
  let component: AdminAddSectionComponent;
  let fixture: ComponentFixture<AdminAddSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
