import { TestBed, inject } from '@angular/core/testing';
import { GamesService } from './games.service';
import { HttpModule } from "@angular/http";

describe('GamesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GamesService],
      imports:[ HttpModule ]
    });
  });

  it('should ...', inject([GamesService], (service: GamesService) => {
    expect(service).toBeTruthy();
  }));
});
