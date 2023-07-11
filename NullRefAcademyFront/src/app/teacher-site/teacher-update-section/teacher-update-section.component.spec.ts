import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherUpdateSectionComponent } from './teacher-update-section.component';

describe('TeacherUpdateSectionComponent', () => {
  let component: TeacherUpdateSectionComponent;
  let fixture: ComponentFixture<TeacherUpdateSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherUpdateSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherUpdateSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
