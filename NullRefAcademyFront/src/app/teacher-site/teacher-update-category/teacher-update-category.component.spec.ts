import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherUpdateCategoryComponent } from './teacher-update-category.component';

describe('TeacherUpdateCategoryComponent', () => {
  let component: TeacherUpdateCategoryComponent;
  let fixture: ComponentFixture<TeacherUpdateCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherUpdateCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherUpdateCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
