import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminShowCourseComponent } from './admin-show-course.component';

describe('AdminShowCourseComponent', () => {
  let component: AdminShowCourseComponent;
  let fixture: ComponentFixture<AdminShowCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminShowCourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminShowCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
