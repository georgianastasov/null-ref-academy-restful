import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminShowSectionComponent } from './admin-show-section.component';

describe('AdminShowSectionComponent', () => {
  let component: AdminShowSectionComponent;
  let fixture: ComponentFixture<AdminShowSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminShowSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminShowSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
