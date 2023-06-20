import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterDiseaseSynonymSearchComponent } from './filter-disease-synonym-search.component';

describe('FilterDiseaseSynonymSearchComponent', () => {
  let component: FilterDiseaseSynonymSearchComponent;
  let fixture: ComponentFixture<FilterDiseaseSynonymSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FilterDiseaseSynonymSearchComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterDiseaseSynonymSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
