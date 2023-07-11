import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUpdateTeacherComponent } from './admin-update-teacher.component';

describe('AdminUpdateTeacherComponent', () => {
  let component: AdminUpdateTeacherComponent;
  let fixture: ComponentFixture<AdminUpdateTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminUpdateTeacherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUpdateTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
