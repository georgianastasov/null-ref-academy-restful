import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminShowAdminComponent } from './admin-show-admin.component';

describe('AdminShowAdminComponent', () => {
  let component: AdminShowAdminComponent;
  let fixture: ComponentFixture<AdminShowAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminShowAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminShowAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
