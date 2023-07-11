import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherSiteComponent } from './teacher-site.component';

describe('TeacherSiteComponent', () => {
  let component: TeacherSiteComponent;
  let fixture: ComponentFixture<TeacherSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherSiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
