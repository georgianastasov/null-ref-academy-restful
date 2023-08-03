import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddArticleComponent } from './admin-add-article.component';

describe('AdminAddAdminComponent', () => {
  let component: AdminAddArticleComponent;
  let fixture: ComponentFixture<AdminAddArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddArticleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
