import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminShowNewsComponent } from './admin-show-news.component';

describe('AdminShowNewsComponent', () => {
  let component: AdminShowNewsComponent;
  let fixture: ComponentFixture<AdminShowNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminShowNewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminShowNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
