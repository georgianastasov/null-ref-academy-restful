import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherProfileStudentComponent } from './teacher-profile-student.component';

describe('TeacherProfileStudentComponent', () => {
  let component: TeacherProfileStudentComponent;
  let fixture: ComponentFixture<TeacherProfileStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherProfileStudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherProfileStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
