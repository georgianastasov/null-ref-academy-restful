import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDeleteNewsComponent } from './admin-delete-news.component';

describe('AdminDeleteNewsComponent', () => {
  let component: AdminDeleteNewsComponent;
  let fixture: ComponentFixture<AdminDeleteNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDeleteNewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDeleteNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
