import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterCategoriesAIV2Component } from './filter-categories-ai-v2.component';

describe('FilterCategoriesAIV2Component', () => {
  let component: FilterCategoriesAIV2Component;
  let fixture: ComponentFixture<FilterCategoriesAIV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterCategoriesAIV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterCategoriesAIV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
