import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterNewsTypeComponent } from './filter-news-type.component';

describe('FilterNewsTypeComponent', () => {
  let component: FilterNewsTypeComponent;
  let fixture: ComponentFixture<FilterNewsTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FilterNewsTypeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterNewsTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
