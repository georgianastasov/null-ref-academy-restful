import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentArticleComponent } from './student-article.component';

describe('StudentArticleComponent', () => {
  let component: StudentArticleComponent;
  let fixture: ComponentFixture<StudentArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentArticleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
