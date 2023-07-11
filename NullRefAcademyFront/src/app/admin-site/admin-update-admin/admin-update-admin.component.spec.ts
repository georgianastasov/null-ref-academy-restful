import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUpdateAdminComponent } from './admin-update-admin.component';

describe('AdminUpdateAdminComponent', () => {
  let component: AdminUpdateAdminComponent;
  let fixture: ComponentFixture<AdminUpdateAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminUpdateAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUpdateAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
