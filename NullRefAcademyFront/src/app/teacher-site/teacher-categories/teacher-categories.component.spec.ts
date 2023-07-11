import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherCategoriesComponent } from './teacher-categories.component';

describe('TeacherCategoriesComponent', () => {
  let component: TeacherCategoriesComponent;
  let fixture: ComponentFixture<TeacherCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherCategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
