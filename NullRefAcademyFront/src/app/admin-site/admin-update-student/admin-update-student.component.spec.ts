import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUpdateStudentComponent } from './admin-update-student.component';

describe('AdminUpdateStudentComponent', () => {
  let component: AdminUpdateStudentComponent;
  let fixture: ComponentFixture<AdminUpdateStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminUpdateStudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUpdateStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
