import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseAssignComponent } from './case-assign.component';

describe('CaseAssignComponent', () => {
  let component: CaseAssignComponent;
  let fixture: ComponentFixture<CaseAssignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseAssignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
