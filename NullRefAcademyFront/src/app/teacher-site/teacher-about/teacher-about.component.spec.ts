import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherAboutComponent } from './teacher-about.component';

describe('TeacherAboutComponent', () => {
  let component: TeacherAboutComponent;
  let fixture: ComponentFixture<TeacherAboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherAboutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
