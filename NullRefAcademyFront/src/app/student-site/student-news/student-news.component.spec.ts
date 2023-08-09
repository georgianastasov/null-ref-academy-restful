import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentNewsComponent } from './student-news.component';

describe('StudentNewsComponent', () => {
  let component: StudentNewsComponent;
  let fixture: ComponentFixture<StudentNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentNewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
