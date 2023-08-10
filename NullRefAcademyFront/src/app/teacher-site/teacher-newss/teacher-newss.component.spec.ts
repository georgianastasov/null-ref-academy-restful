import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherNewssComponent } from './teacher-newss.component';

describe('TeacherNewssComponent', () => {
  let component: TeacherNewssComponent;
  let fixture: ComponentFixture<TeacherNewssComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherNewssComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherNewssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
