import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminShowStudentComponent } from './admin-show-student.component';

describe('AdminShowStudentComponent', () => {
  let component: AdminShowStudentComponent;
  let fixture: ComponentFixture<AdminShowStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminShowStudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminShowStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
