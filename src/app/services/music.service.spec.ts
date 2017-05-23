import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from "@angular/http";
import { MusicService } from './music.service';

describe('MusicService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MusicService],
      imports:[ HttpModule ]
    });
  });

  it('should ...', inject([MusicService], (service: MusicService) => {
    expect(service).toBeTruthy();
  }));
});
