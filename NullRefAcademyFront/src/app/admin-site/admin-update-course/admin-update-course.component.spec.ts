import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUpdateCourseComponent } from './admin-update-course.component';

describe('AdminUpdateCourseComponent', () => {
  let component: AdminUpdateCourseComponent;
  let fixture: ComponentFixture<AdminUpdateCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminUpdateCourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUpdateCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
