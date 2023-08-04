import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherAddArticleComponent } from './teacher-add-article.component';

describe('TeacherAddArticleComponent', () => {
  let component: TeacherAddArticleComponent;
  let fixture: ComponentFixture<TeacherAddArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherAddArticleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherAddArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
