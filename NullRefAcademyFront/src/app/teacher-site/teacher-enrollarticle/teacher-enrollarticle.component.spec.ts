import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherEnrollArticleComponent } from './teacher-enrollarticle.component';

describe('TeacherEnrollArticleComponent', () => {
  let component: TeacherEnrollArticleComponent;
  let fixture: ComponentFixture<TeacherEnrollArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherEnrollArticleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherEnrollArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
