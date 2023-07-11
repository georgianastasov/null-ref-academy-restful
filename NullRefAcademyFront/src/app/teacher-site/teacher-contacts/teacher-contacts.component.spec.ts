import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherContactsComponent } from './teacher-contacts.component';

describe('TeacherContactsComponent', () => {
  let component: TeacherContactsComponent;
  let fixture: ComponentFixture<TeacherContactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherContactsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
