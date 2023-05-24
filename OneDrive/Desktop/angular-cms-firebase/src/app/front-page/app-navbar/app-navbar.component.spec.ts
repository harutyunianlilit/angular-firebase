import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontNavbarComponent } from './app-navbar.component';

describe('AppNavbarComponent', () => {
  let component: FrontNavbarComponent;
  let fixture: ComponentFixture<FrontNavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FrontNavbarComponent]
    });
    fixture = TestBed.createComponent(FrontNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
