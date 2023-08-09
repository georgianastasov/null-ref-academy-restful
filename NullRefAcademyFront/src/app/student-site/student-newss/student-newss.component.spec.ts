import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentNewssComponent } from './student-newss.component';

describe('StudentNewssComponent', () => {
  let component: StudentNewssComponent;
  let fixture: ComponentFixture<StudentNewssComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentNewssComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentNewssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
