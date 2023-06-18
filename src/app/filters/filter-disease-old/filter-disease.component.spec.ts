import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterDiseaseComponent } from './filter-disease.component';

describe('FilterDiseaseAIV2Component', () => {
  let component: FilterDiseaseComponent;
  let fixture: ComponentFixture<FilterDiseaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FilterDiseaseComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterDiseaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
