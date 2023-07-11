import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherSectionsComponent } from './teacher-sections.component';

describe('TeacherSectionsComponent', () => {
  let component: TeacherSectionsComponent;
  let fixture: ComponentFixture<TeacherSectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherSectionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherSectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
