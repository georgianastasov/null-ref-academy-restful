import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherEnrollNewsComponent } from './teacher-enrollnews.component';

describe('TeacherEnrollNewsComponent', () => {
  let component: TeacherEnrollNewsComponent;
  let fixture: ComponentFixture<TeacherEnrollNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherEnrollNewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherEnrollNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
