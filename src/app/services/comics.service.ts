import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions} from "@angular/http";
import { formatDate } from '../utils/formatDate';
import { Observable } from "rxjs";
@Injectable()
export class ComicsService {
  private url = "http://localhost:3000";
  public preview:Array<any>;
  public item:any;

    constructor(private http: Http){}
      getPreview(limit?:number, offset?:number): Observable<any>{
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
          this.preview = [];
            return this.http.get(this.url+'/comics/preview/'+limit+'/'+offset, options)
                   .map((data) => {
                       //console.log(data.json())
                          let result = data.json().data.data
                          this.preview.push(result);
                          //  console.log(this.preview)
                          return this.preview;
                      })
                      .catch((error) => {
                  return Observable.throw(error)
                })
              }
              getItem(id:string): Observable<any>{
                let headers = new Headers({ 'Content-Type': 'application/json' });
                let options = new RequestOptions({ headers: headers });

                    return this.http.get(this.url+'/comics/details/'+id, options)
                           .map((data) => {
                                  let result = data.json().data.data.results[0]

                                  let d = new Date(result.dates[0].date)
                                  let date = formatDate(d);
                                  //this.creators = item.creators.items
                                  this.item = result;

                                  this.item.prices[0].price = data.json().ukprice
                                  this.item.dates[0].date = date;
                                  return this.item;
                              })
                              .catch((error) => {
                          return Observable.throw(error)
                        })
                      }
}
