import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAboutComponent } from './student-about.component';

describe('StudentAboutComponent', () => {
  let component: StudentAboutComponent;
  let fixture: ComponentFixture<StudentAboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentAboutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
