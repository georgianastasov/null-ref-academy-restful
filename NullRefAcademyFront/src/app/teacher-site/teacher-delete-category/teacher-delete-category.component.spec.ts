import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherDeleteCategoryComponent } from './teacher-delete-category.component';

describe('TeacherDeleteCategoryComponent', () => {
  let component: TeacherDeleteCategoryComponent;
  let fixture: ComponentFixture<TeacherDeleteCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherDeleteCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherDeleteCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
