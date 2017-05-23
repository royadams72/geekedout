import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from "@angular/http";
import { ComicsService } from './comics.service';

describe('ComicsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComicsService],
      imports:[HttpModule]
    });
  });

  it('should ...', inject([ComicsService], (service: ComicsService) => {
    expect(service).toBeTruthy();

  }));



});
