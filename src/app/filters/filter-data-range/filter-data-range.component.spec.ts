import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterDataRangeComponent } from './filter-data-range.component';

describe('FilterDataRangeComponent', () => {
  let component: FilterDataRangeComponent;
  let fixture: ComponentFixture<FilterDataRangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterDataRangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterDataRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
