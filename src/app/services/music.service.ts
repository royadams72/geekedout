import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions} from "@angular/http";
import { Observable } from "rxjs";
import { APPCONFIG } from '../app.config';
@Injectable()
export class MusicService {
  private url = APPCONFIG.URL;
  public previewObj:any;
  public albumObj:any;
  constructor(private http: Http){}

getPreview(limit): Observable<any>{
  let headers = new Headers({ 'Content-Type': 'application/json' });
  let options = new RequestOptions({ headers: headers });
      return this.http.get(this.url+'/music/preview/'+limit, options)
         .map((data) => {
              let result = data.json().data;
              this.previewObj = result;
              return this.previewObj;
          })
            .catch((error) => {
        return Observable.throw(error)
      })
}

getItem(id): Observable<any>{
  let headers = new Headers({ 'Content-Type': 'application/json' });
  let options = new RequestOptions({ headers: headers });
      return this.http.get(this.url+'/music/getAlbum/'+id, options)
         .map((data) => {
           console.log(data.json().data)
                let result = data.json().data;
                this.albumObj = result;
                return this.albumObj;
            })
            .catch((error) => {
              return Observable.throw(error)
            })
    }
}
