import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions} from "@angular/http";
import { Observable } from "rxjs";
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { APPCONFIG } from '../app.config';
// import 'rxjs/add/operator/switchMap';

@Injectable()
export class SearchService {
  private url = APPCONFIG.URL;
  private searchResults:Array<any> = [];
  constructor(private http: Http) { }

  public search(query: Observable<string>){
    return query.debounceTime(300)
    .distinctUntilChanged()
    .filter(query => query.length > 0 && query.replace(/\s+/g, '') !== '' )
    .switchMap(
      query => {
      return this.callSearches(query)
    })
  }

public callSearches(query){
    return Observable.forkJoin([
        this.searchMovies(query),
        this.searchGames(query),
        this.searchComics(query),
        this.searchMusic(query)
    ])
      .map((data)=>{
        this.searchResults = data;
        return this.searchResults

      })
      .catch((error) => {
        return Observable.throw(error)
      })

  }
  public searchMovies(query): Observable<any>{
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });

        return this.http.get(this.url+'/movies/search/'+query, options)
           .map((data) => {
              let result;
                  result = data.json().data.results;
                  return result;
              })
          .catch((error) => {
        return Observable.throw(error)
      })

    }

  public searchGames(query): Observable<any>{
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });

        return this.http.get(this.url+'/games/search/'+query, options)
           .map((data) => {
              let result;
                  result = data.json().data;
                  console.log(result)
                  return result;
              })
          .catch((error) => {
        return Observable.throw(error)
      })

  }


  public searchComics(query): Observable<any>{
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });

        return this.http.get(this.url+'/comics/search/'+query, options)
           .map((data) => {
           let  result;
                result = data.json().data.data.results;
                // console.log('comics');
                return result;
              })
          .catch((error) => {
        return Observable.throw(error)
      })

    }

    public searchMusic(query): Observable<any>{
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

          return this.http.get(this.url+'/music/search/'+query, options)
             .map((data) => {
             let  result;
                  result = data.json().data.albums.items;
                  return result;
                })
            .catch((error) => {
          return Observable.throw(error)
         })
      }


}
