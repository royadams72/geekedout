import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions} from "@angular/http";
import { Observable } from "rxjs";
@Injectable()
export class GamesService {

  private url = "http://localhost:3000";
  public preview:Array<any> = [];


    constructor(private http: Http){}
      getPreview(): Observable<any>{
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

            return this.http.get(this.url+'/games/preview', options)
                   .map((data) => {
                        //  console.log(data.json().data.data.results)
                          let result = data.json().data
                          this.preview.push(...result)
                          return this.preview;
                      })
                      .catch((error) => {
                  return Observable.throw(error)
                })
              }

}
