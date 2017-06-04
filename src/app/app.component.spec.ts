import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { MockComponent } from '../testing/mock.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent,
                      MockComponent({ selector: 'app-nav' }),
                      MockComponent({ selector: 'app-home' })]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));


});
