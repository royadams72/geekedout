import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions} from "@angular/http";
import { Observable } from "rxjs";
@Injectable()
export class MoviesService {
  private url = "http://localhost:3000";
  public preview:Array<any> = [];
  public d:any = new Date();
  public item:Array <any> = [];
  public today:any = new Date((this.d.getMonth()+1) + "/" + this.d.getDate()+ "/" + this.d.getFullYear());
  public diffDays:number
  constructor(private http: Http){
    //Check configuration; holds info, url paths etc. for display
    if (localStorage.getItem('date') !==null && localStorage.getItem('configuration') !== null){
      //If Date and configuration in LS, test to see if it's been 2 days since configuration updated
      let twoDaysAgo = new Date(localStorage.getItem('date'))
      let timeDiff = Math.abs(this.today.getTime() - twoDaysAgo.getTime());
      this.diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      //console.log(twoDaysAgo)

    }
  }

        getMovie(action, pageNum?:number): Observable<any>{
          let headers = new Headers({ 'Content-Type': 'application/json' });
          let options = new RequestOptions({ headers: headers });
          let h;
            return h = this.http.get(this.url+'/movies/info', options)
                   .mergeMap((data) => {
                     let imagedata = data.json().data.images;
                      //If LS not there OR has not been updated for 2 days...
                     if (localStorage.getItem('date') === null || this.diffDays >= 2){
                           localStorage.setItem('configuration', JSON.stringify(imagedata));
                     }
                     if(action == 'showAll' || action == 'preview'){
                      return this.getInfo(action, pageNum);
                     }else{

                       return this.getMovieDetails(action);

                     }

                      })
                      .catch((error) => {
                  return Observable.throw(error)
                })
              }

              getInfo(action, pageNum): Observable<any>{
                let headers = new Headers({ 'Content-Type': 'application/json' });
                let options = new RequestOptions({ headers: headers });
                let h
                  return h = this.http.get(this.url+'/movies/preview/'+pageNum, options)
                         .map((data) => {
                           let result;
                          //  console.log(imagedata.images)
                            if(action == 'preview'){
                               result = data.json().data.results.slice(0,4);
                             }else{
                                result = data.json().data.results;
                             }
                                this.preview = result;
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
                                //  console.log(imagedata.images)
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
