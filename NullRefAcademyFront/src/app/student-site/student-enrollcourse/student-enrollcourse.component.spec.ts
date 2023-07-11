import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentEnrollcourseComponent } from './student-enrollcourse.component';

describe('StudentEnrollcourseComponent', () => {
  let component: StudentEnrollcourseComponent;
  let fixture: ComponentFixture<StudentEnrollcourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentEnrollcourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentEnrollcourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
