import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from '../../../testing/mock.component';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent,
                      MockComponent({ selector: 'app-musicpreview' }),
                      MockComponent({ selector: 'app-comicspreview' }),
                      MockComponent({ selector: 'app-gamespreview' }),
                      MockComponent({ selector: 'app-moviespreview' })]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
