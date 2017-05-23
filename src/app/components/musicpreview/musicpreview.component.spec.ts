import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MusicpreviewComponent } from './musicpreview.component';
import { MusicService } from '../../services/music.service';
import { HttpModule } from "@angular/http";
import { Observable } from "rxjs";
describe('MusicpreviewComponent', () => {
  let component: MusicpreviewComponent;
  let fixture: ComponentFixture<MusicpreviewComponent>;
  let musicService: MusicService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusicpreviewComponent ],
      providers:[ MusicService ],
      imports:[ HttpModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicpreviewComponent);
    component = fixture.componentInstance;
    musicService = TestBed.get(MusicService)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Should set items array with values from musicService', () => {

  let spy = spyOn(musicService, 'getPreview').and.callFake(()=>{
    return Observable.from([[{id1: 1, title: 'a'}, {id1: 2, title: 'b'}]])
  })
  component.ngOnInit();
  // do stuff
  expect(component.items.length).toBeGreaterThan(0);
  });

});
