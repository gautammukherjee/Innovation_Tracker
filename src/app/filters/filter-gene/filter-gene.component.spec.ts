import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterGeneComponent } from './filter-gene.component';

describe('FilterGeneComponent', () => {
  let component: FilterGeneComponent;
  let fixture: ComponentFixture<FilterGeneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FilterGeneComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterGeneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
