import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentContactsComponent } from './student-contacts.component';

describe('StudentContactsComponent', () => {
  let component: StudentContactsComponent;
  let fixture: ComponentFixture<StudentContactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentContactsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
