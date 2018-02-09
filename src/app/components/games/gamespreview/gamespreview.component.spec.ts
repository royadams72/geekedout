import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule} from "@angular/http";
import { GamespreviewComponent } from './gamespreview.component';
import { GamesService } from '../../services/games.service';
import { LoadingComponent } from '../loading/loading.component';
import { TruncatePipe } from 'angular2-truncate';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { Observable } from "rxjs";

describe('GamespreviewComponent', () => {
  let component: GamespreviewComponent;
  let fixture: ComponentFixture<GamespreviewComponent>;
  let gamesService: GamesService
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamespreviewComponent, LoadingComponent, TruncatePipe],
      providers:[ GamesService ],
      imports:[HttpModule, BrowserAnimationsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamespreviewComponent);
    component = fixture.componentInstance;
    gamesService = fixture.debugElement.injector.get(GamesService)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Should set items array with values from service', () => {

  let spy = spyOn(gamesService, 'getPreview').and.callFake(()=>{
    return Observable.from([[{id1: 1, title: 'a'}, {id1: 2, title: 'b'}]])
  })
  component.ngOnInit();
  // do stuff
  expect(component.items.length).toBeGreaterThan(0);
});

});
