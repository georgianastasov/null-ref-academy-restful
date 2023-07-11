import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminShowTeacherComponent } from './admin-show-teacher.component';

describe('AdminShowTeacherComponent', () => {
  let component: AdminShowTeacherComponent;
  let fixture: ComponentFixture<AdminShowTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminShowTeacherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminShowTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
