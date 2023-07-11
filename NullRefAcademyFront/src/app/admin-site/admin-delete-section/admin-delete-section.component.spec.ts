import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDeleteSectionComponent } from './admin-delete-section.component';

describe('AdminDeleteSectionComponent', () => {
  let component: AdminDeleteSectionComponent;
  let fixture: ComponentFixture<AdminDeleteSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDeleteSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDeleteSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
