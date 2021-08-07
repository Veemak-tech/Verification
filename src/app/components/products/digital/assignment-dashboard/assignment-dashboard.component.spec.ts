import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentDashboardComponent } from './assignment-dashboard.component';

describe('AssignmentDashboardComponent', () => {
  let component: AssignmentDashboardComponent;
  let fixture: ComponentFixture<AssignmentDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignmentDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
