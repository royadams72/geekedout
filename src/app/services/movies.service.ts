import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions} from "@angular/http";
import { ElapsedTimeService } from './elapsed-time.service';
import { Observable } from "rxjs";
@Injectable()
export class MoviesService {
  private url = "http://localhost:3000";
  public preview:Array<any> = [];
  public item:Array <any> = [];

  constructor(private http: Http, private elapsedTime: ElapsedTimeService ){
    //Check if localStorage date is available, if not set internal var diffDays to 2
    this.elapsedTime.setDay();
  }

public getMovie(action, pageNum?:number): Observable<any>{
    //Gets movie configuration from server first, if not done so, for 2 diffDays
    //Then loads multiple movie function or movie details
  let headers = new Headers({ 'Content-Type': 'application/json' });
  let options = new RequestOptions({ headers: headers });

  if(!this.elapsedTime.isInfoSet('configuration')){
    return this.http.get(this.url+'/movies/info', options)
       .mergeMap((data) => {
           let imagedata = data.json().data.images;
            //Service checks if LS has not been updated for 2 days, if not set to returned data
            this.elapsedTime.setItems('configuration', JSON.stringify(imagedata));
              return this.getMovieFunction(action, pageNum);
          })
          .catch((error) => {
              return Observable.throw(error)
          })
        }else{
        return this.getMovieFunction(action, pageNum);
      }
}

    public getMovieFunction(action, pageNum?:number){

      console.log(action)
      if(action == 'showAll' || action == 'preview'){
       return this.getInfo(action, pageNum);
         }else{
        return this.getMovieDetails(action);
       }
    }

    public getInfo(action, pageNum): Observable<any>{
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
          return this.http.get(this.url+'/movies/preview/'+pageNum, options)
             .map((data) => {
               let result;
                if(action == 'preview'){
                   result = data.json().data.results.slice(0,4);
                 }else{
                    result = data.json().data;
                 }
                   this.preview = result;
                    //console.log(this.preview)
                    return this.preview;
                })
            .catch((error) => {
          return Observable.throw(error)
        })
      }

  getMovieDetails(action): Observable<any>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let id = action;
      return this.http.get(this.url+'/movies/details/'+id, options)
             .map((data) => {

                    let result = data.json().data;
                    this.item = []
                    this.item.push(result);
                   return this.item;
                })
                .catch((error) => {
            return Observable.throw(error)
          })
        }

}
