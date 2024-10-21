import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExitOrderComponent } from './exit-order.component';

describe('ExitOrderComponent', () => {
  let component: ExitOrderComponent;
  let fixture: ComponentFixture<ExitOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExitOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExitOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
