import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherDeleteArticleComponent } from './teacher-delete-article.component';

describe('TeacherDeleteArticleComponent', () => {
  let component: TeacherDeleteArticleComponent;
  let fixture: ComponentFixture<TeacherDeleteArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherDeleteArticleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherDeleteArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
