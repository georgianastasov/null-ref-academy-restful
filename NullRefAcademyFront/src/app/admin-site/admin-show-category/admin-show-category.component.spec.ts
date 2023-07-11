import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminShowCategoryComponent } from './admin-show-category.component';

describe('AdminShowCategoryComponent', () => {
  let component: AdminShowCategoryComponent;
  let fixture: ComponentFixture<AdminShowCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminShowCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminShowCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
