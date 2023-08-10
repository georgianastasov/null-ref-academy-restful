import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherNewsComponent } from './teacher-news.component';

describe('TeacherNewsComponent', () => {
  let component: TeacherNewsComponent;
  let fixture: ComponentFixture<TeacherNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherNewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
