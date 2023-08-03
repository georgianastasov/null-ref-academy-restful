import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminShowArticleComponent } from './admin-show-article.component';

describe('AdminShowArticleComponent', () => {
  let component: AdminShowArticleComponent;
  let fixture: ComponentFixture<AdminShowArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminShowArticleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminShowArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
