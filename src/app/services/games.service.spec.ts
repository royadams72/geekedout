import { TestBed, inject, getTestBed, async} from '@angular/core/testing';
import {
  Headers, BaseRequestOptions,
  Response, HttpModule, Http, XHRBackend, RequestMethod, ResponseOptions} from "@angular/http";
import { GamesService } from './games.service';
import {MockBackend, MockConnection} from '@angular/http/testing';

describe('GamesService', () => {
  const mockResponse = {
  data:  [
      { id: 0, name: 'Name 0' },
      { id: 1, name: 'Name 1' },
      { id: 2, name: 'Name 2' },
      { id: 3, name: 'Name 3' },
    ]
  };
let mockBackend: MockBackend;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GamesService, MockBackend,
        BaseRequestOptions,
        {
          provide: Http, deps: [MockBackend, BaseRequestOptions],
          useFactory:
            (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
              return new Http(backend, defaultOptions);
            }
       }],
      imports:[ HttpModule ]
    });
   mockBackend = getTestBed().get(MockBackend);
  });

  it('Service should initiate', inject([GamesService], (service: GamesService) => {
    expect(service).toBeTruthy();
  }));

  it('should get data from http call async',
      async(inject([GamesService], (gamesService) => {
        mockBackend.connections.subscribe(
          (connection: MockConnection) => {
            connection.mockRespond(new Response(//JSON.stringify(mockResponse)
              new ResponseOptions({
                  body: JSON.stringify(mockResponse)
                }
              )));
          });

        gamesService.getPreview().subscribe(
          (data) => {
          
             expect(data).toBeDefined();
             expect(data.length).toBe(4);
             expect(data[1].id).toBe(1);
        }
      );
      })));

});
