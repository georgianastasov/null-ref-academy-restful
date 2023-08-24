import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentEnrollArticleComponent } from './student-enrollarticle.component';

describe('StudentEnrollArticleComponent', () => {
  let component: StudentEnrollArticleComponent;
  let fixture: ComponentFixture<StudentEnrollArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentEnrollArticleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentEnrollArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
