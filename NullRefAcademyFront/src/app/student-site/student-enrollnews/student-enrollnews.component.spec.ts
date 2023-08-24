import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentEnrollNewsComponent } from './student-enrollnews.component';

describe('StudentEnrollNewsComponent', () => {
  let component: StudentEnrollNewsComponent;
  let fixture: ComponentFixture<StudentEnrollNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentEnrollNewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentEnrollNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
