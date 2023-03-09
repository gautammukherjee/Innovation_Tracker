import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsletterListsComponent } from './newsletter-lists.component';

describe('NewsletterListsComponent', () => {
  let component: NewsletterListsComponent;
  let fixture: ComponentFixture<NewsletterListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewsletterListsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsletterListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
