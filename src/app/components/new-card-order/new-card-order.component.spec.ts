import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCardOrderComponent } from './new-card-order.component';

describe('NewCardOrderComponent', () => {
  let component: NewCardOrderComponent;
  let fixture: ComponentFixture<NewCardOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCardOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCardOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
