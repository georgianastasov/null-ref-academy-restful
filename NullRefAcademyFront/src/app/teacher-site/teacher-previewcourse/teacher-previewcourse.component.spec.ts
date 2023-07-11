import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherPreviewcourseComponent } from './teacher-previewcourse.component';

describe('TeacherPreviewcourseComponent', () => {
  let component: TeacherPreviewcourseComponent;
  let fixture: ComponentFixture<TeacherPreviewcourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherPreviewcourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherPreviewcourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
