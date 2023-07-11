import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherAddSectionComponent } from './teacher-add-section.component';

describe('TeacherAddSectionComponent', () => {
  let component: TeacherAddSectionComponent;
  let fixture: ComponentFixture<TeacherAddSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherAddSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherAddSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
