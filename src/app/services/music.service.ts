import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions} from "@angular/http";
import { Observable } from "rxjs";
@Injectable()
export class MusicService {
  private url = "http://localhost:3000";
  public preview:Array<any> = [];
  constructor(private http: Http){}

      getPreview(): Observable<any>{
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
            return this.http.post(this.url+'/music/preview', options)
                   .map((data) => {
                         //console.log(data.json().data.albums.items)
                          let result = data.json().data.albums.items;
                          this.preview = result;
                          return this.preview;
                      })
                      .catch((error) => {
                  return Observable.throw(error)
                })
              }
}
