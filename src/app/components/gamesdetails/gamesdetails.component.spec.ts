import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesdetailsComponent } from './gamesdetails.component';

describe('GamesdetailsComponent', () => {
  let component: GamesdetailsComponent;
  let fixture: ComponentFixture<GamesdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamesdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
