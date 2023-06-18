import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterDiseaseSynonymComponent } from './filter-disease-synonym.component';

describe('FilterDiseaseSynonymComponent', () => {
  let component: FilterDiseaseSynonymComponent;
  let fixture: ComponentFixture<FilterDiseaseSynonymComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FilterDiseaseSynonymComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterDiseaseSynonymComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
