import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDeleteArticleComponent } from './admin-delete-article.component';

describe('AdminDeleteArticleComponent', () => {
  let component: AdminDeleteArticleComponent;
  let fixture: ComponentFixture<AdminDeleteArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDeleteArticleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDeleteArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
