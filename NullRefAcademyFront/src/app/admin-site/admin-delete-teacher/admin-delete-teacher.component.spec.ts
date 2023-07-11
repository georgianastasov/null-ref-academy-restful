import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDeleteTeacherComponent } from './admin-delete-teacher.component';

describe('AdminDeleteTeacherComponent', () => {
  let component: AdminDeleteTeacherComponent;
  let fixture: ComponentFixture<AdminDeleteTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDeleteTeacherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDeleteTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
