import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonFoundComponent } from './non-found.component';

describe('NonFoundComponent', () => {
  let component: NonFoundComponent;
  let fixture: ComponentFixture<NonFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonFoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
