import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherDeleteSectionComponent } from './teacher-delete-section.component';

describe('TeacherDeleteSectionComponent', () => {
  let component: TeacherDeleteSectionComponent;
  let fixture: ComponentFixture<TeacherDeleteSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherDeleteSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherDeleteSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
