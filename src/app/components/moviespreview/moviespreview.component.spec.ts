import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MoviesService } from '../../services/movies.service';
import { MoviespreviewComponent } from './moviespreview.component';
import { HttpModule } from "@angular/http";
import { LoadingComponent } from '../loading/loading.component';
import { TruncatePipe } from 'angular2-truncate';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { Observable } from "rxjs";

describe('MoviespreviewComponent', () => {
  let component: MoviespreviewComponent;
  let fixture: ComponentFixture<MoviespreviewComponent>;
  let moviesService: MoviesService;
  // Storage Mock
  function storageMock() {
    var storage = {};

    return {
      setItem: function(key, value) {
        storage[key] = value || '';
      },
      getItem: function(key) {
        return key in storage ? storage[key] : null;
      },
      removeItem: function(key) {
        delete storage[key];
      },
      get length() {
        return Object.keys(storage).length;
      },
      key: function(i) {
        var keys = Object.keys(storage);
        return keys[i] || null;
      }
    };
  }
  let mockConfig = JSON.stringify({
    base_url:"http://image_url/",
    poster_sizes:['w9', 'w100']
  })
let m =  storageMock()
  m.setItem('configuration', mockConfig)
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviespreviewComponent, LoadingComponent, TruncatePipe ],
      providers:[ MoviesService ],
      imports:[ HttpModule, BrowserAnimationsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviespreviewComponent);
    component = fixture.componentInstance;
    moviesService = TestBed.get(MoviesService);
    Object.defineProperty(window, 'localStorage', { value: m });//Had to use this to 'swap'  localStorage on the window property with my storage
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();

  });
  it('Should set items array with values from MoviesService', async(() => {

    //  console.log(component.config)
  let spy = spyOn(moviesService, 'getPreview').and.callFake(()=>{
    component.config =  JSON.parse(m.getItem('configuration'));
    return Observable.from([[{id1: 1, title: 'a'}, {id1: 2, title: 'b'}]])
  })
  component.ngAfterViewInit();
  // do stuff
  expect(component.items.length).toBeGreaterThan(0);
}));

});
