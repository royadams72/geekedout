import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ComicspreviewComponent } from './comicspreview.component';
import { HttpModule } from "@angular/http";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
//import { MockService } from '../../../testing/mock.service';
import { Observable } from "rxjs";
import { ComicsService } from '../../services/comics.service';
import { MockComponent } from '../../../testing/mock.component';
import { TruncatePipe } from 'angular2-truncate';
import { LoadingComponent } from '../loading/loading.component';

describe('ComicspreviewComponent', () => {
  let component: ComicspreviewComponent;
  let fixture: ComponentFixture<ComicspreviewComponent>;
  let comicsService: ComicsService;


  beforeEach(async(() => {

    TestBed.configureTestingModule({
       declarations: [ ComicspreviewComponent, LoadingComponent, TruncatePipe],
       providers: [ComicsService],
       imports:[HttpModule, BrowserAnimationsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComicspreviewComponent);
    component = fixture.componentInstance;
    comicsService = TestBed.get(ComicsService)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();

  });

  it('Should set items array with values from service', () => {

  let spy = spyOn(comicsService, 'getPreview').and.callFake(()=>{
    return Observable.from([[{id1: 1, title: 'a'}, {id1: 2, title: 'b'}]])
  })
  component.ngOnInit();
  // do stuff
  expect(component.items.length).toBeGreaterThan(0);
});




});
