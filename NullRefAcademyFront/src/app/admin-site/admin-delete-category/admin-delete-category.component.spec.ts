import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDeleteCategoryComponent } from './admin-delete-category.component';

describe('AdminDeleteCategoryComponent', () => {
  let component: AdminDeleteCategoryComponent;
  let fixture: ComponentFixture<AdminDeleteCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDeleteCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDeleteCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
