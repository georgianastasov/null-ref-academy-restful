import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherDeleteCourseComponent } from './teacher-delete-course.component';

describe('TeacherDeleteCourseComponent', () => {
  let component: TeacherDeleteCourseComponent;
  let fixture: ComponentFixture<TeacherDeleteCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherDeleteCourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherDeleteCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
