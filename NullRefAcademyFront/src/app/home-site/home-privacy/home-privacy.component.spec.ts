import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePrivacyComponent } from './home-privacy.component';

describe('HomePrivacyComponent', () => {
  let component: HomePrivacyComponent;
  let fixture: ComponentFixture<HomePrivacyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePrivacyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePrivacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
