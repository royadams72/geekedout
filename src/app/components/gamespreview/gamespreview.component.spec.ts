import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule} from "@angular/http";
import { GamespreviewComponent } from './gamespreview.component';
import { GamesService } from '../../services/games.service';
describe('GamespreviewComponent', () => {
  let component: GamespreviewComponent;
  let fixture: ComponentFixture<GamespreviewComponent>;
  let gamesService: GamesService
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamespreviewComponent ],
      providers:[ GamesService ],
      imports:[HttpModule]
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
});
