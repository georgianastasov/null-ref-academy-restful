import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherArticleComponent } from './teacher-article.component';

describe('TeacherArticleComponent', () => {
  let component: TeacherArticleComponent;
  let fixture: ComponentFixture<TeacherArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherArticleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
