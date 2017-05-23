import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from "@angular/http";
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MoviesService],
      imports:[ HttpModule ]
    });
  });

  it('should ...', inject([MoviesService], (service: MoviesService) => {
    expect(service).toBeTruthy();
  }));
});
