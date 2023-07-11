import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDeleteAdminComponent } from './admin-delete-admin.component';

describe('AdminDeleteAdminComponent', () => {
  let component: AdminDeleteAdminComponent;
  let fixture: ComponentFixture<AdminDeleteAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDeleteAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDeleteAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
