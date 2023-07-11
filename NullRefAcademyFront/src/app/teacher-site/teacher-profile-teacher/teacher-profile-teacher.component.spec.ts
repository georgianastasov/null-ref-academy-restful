import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherProfileTeacherComponent } from './teacher-profile-teacher.component';

describe('TeacherProfileTeacherComponent', () => {
  let component: TeacherProfileTeacherComponent;
  let fixture: ComponentFixture<TeacherProfileTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherProfileTeacherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherProfileTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
