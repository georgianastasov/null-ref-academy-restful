import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherUpdateArticleComponent } from './teacher-update-article.component';

describe('TeacherUpdateArticleComponent', () => {
  let component: TeacherUpdateArticleComponent;
  let fixture: ComponentFixture<TeacherUpdateArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherUpdateArticleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherUpdateArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
