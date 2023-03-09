import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterMoaComponent } from './filter-moa.component';

describe('FilterMoaComponent', () => {
  let component: FilterMoaComponent;
  let fixture: ComponentFixture<FilterMoaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FilterMoaComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterMoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
