import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCategoriesComponent } from './student-categories.component';

describe('StudentCategoriesComponent', () => {
  let component: StudentCategoriesComponent;
  let fixture: ComponentFixture<StudentCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentCategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
