import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterDevelopmentPhaseComponent } from './filter-development-phase.component';

describe('FilterDevelopmentPhaseComponent', () => {
  let component: FilterDevelopmentPhaseComponent;
  let fixture: ComponentFixture<FilterDevelopmentPhaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FilterDevelopmentPhaseComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterDevelopmentPhaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
