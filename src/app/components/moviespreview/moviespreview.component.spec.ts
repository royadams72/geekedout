import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MoviesService } from '../../services/movies.service';
import { MoviespreviewComponent } from './moviespreview.component';
import { HttpModule } from "@angular/http";
import { Observable } from "rxjs";
describe('MoviespreviewComponent', () => {
  let component: MoviespreviewComponent;
  let fixture: ComponentFixture<MoviespreviewComponent>;
  let moviesService: MoviesService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviespreviewComponent ],
      providers:[ MoviesService ],
      imports:[ HttpModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviespreviewComponent);
    component = fixture.componentInstance;
    moviesService = TestBed.get(MoviesService)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Should set items array with values from MoviesService', () => {

  let spy = spyOn(moviesService, 'getPreview').and.callFake(()=>{
    return Observable.from([[{id1: 1, title: 'a'}, {id1: 2, title: 'b'}]])
  })
  component.ngOnInit();
  // do stuff
  expect(component.items.length).toBeGreaterThan(0);
});

});
