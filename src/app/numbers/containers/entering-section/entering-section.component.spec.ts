import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnteringSectionComponent } from './entering-section.component';

describe('EnteringSectionComponent', () => {
  let component: EnteringSectionComponent;
  let fixture: ComponentFixture<EnteringSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnteringSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnteringSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
