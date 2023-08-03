import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUpdateArticleComponent } from './admin-update-article.component';

describe('AdminUpdateArticleComponent', () => {
  let component: AdminUpdateArticleComponent;
  let fixture: ComponentFixture<AdminUpdateArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminUpdateArticleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUpdateArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
