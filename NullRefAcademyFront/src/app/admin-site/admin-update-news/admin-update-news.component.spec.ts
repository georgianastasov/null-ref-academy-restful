import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUpdateNewsComponent } from './admin-update-news.component';

describe('AdminUpdateNewsComponent', () => {
  let component: AdminUpdateNewsComponent;
  let fixture: ComponentFixture<AdminUpdateNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminUpdateNewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUpdateNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
