import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherAddCategoryComponent } from './teacher-add-category.component';

describe('TeacherAddCategoryComponent', () => {
  let component: TeacherAddCategoryComponent;
  let fixture: ComponentFixture<TeacherAddCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherAddCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherAddCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
