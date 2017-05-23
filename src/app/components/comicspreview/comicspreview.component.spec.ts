import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComicspreviewComponent } from './comicspreview.component';
import { HttpModule } from "@angular/http";
//import { MockService } from '../../../testing/mock.service';
import { Observable } from "rxjs";
import { ComicsService } from '../../services/comics.service';

describe('ComicspreviewComponent', () => {
  let component: ComicspreviewComponent;
  let fixture: ComponentFixture<ComicspreviewComponent>;
  let comicsService: ComicsService;


  beforeEach(async(() => {

    TestBed.configureTestingModule({
       declarations: [ ComicspreviewComponent ],
       providers: [ComicsService ],
       imports:[HttpModule]
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
