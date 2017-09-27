import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBtnComponent } from './search-btn.component';

describe('SearchBtnComponent', () => {
  let component: SearchBtnComponent;
  let fixture: ComponentFixture<SearchBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
