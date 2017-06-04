import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComicdetailsComponent } from './comicdetails.component';

describe('ComicdetailsComponent', () => {
  let component: ComicdetailsComponent;
  let fixture: ComponentFixture<ComicdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComicdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComicdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
