import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllNewsListsComponent } from './all-news-lists.component';

describe('AllNewsListsComponent', () => {
  let component: AllNewsListsComponent;
  let fixture: ComponentFixture<AllNewsListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AllNewsListsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllNewsListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
