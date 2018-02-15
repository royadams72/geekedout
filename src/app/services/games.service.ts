import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from "@angular/http";
import { Observable } from "rxjs";
import 'rxjs';
import { ElapsedTimeService } from './elapsed-time.service';
import { APPCONFIG } from '../app.config';
@Injectable()
export class GamesService {

  private url = APPCONFIG.URL//"https://geeked-out.herokuapp.com";
  public items: Array<any> = [];
  public item: Array<any> = [];
  public enumElements = [['genres'], ['player_perspectives'], ['game_modes'], ['themes']]//elements that are returned from API as numbers
  public enumList: Array<any> = [];//List downloaded via API to match to enumElements

  constructor(private http: Http, private elapsedTime: ElapsedTimeService) {
    //Check if localStorage date is available, if not set internal var diffDays to 2
    this.elapsedTime.setDay();

  }


  public getItems(limit: number): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.url + '/games/preview/' + limit, options)

      .map((data) => {
        let result = data.json().data;
        this.items = result;
        // console.log(this.items)
        return this.items;
      })
      .catch((error) => {
        return Observable.throw(error)
      })
  }
  public getItem(id: number): Observable<any> {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    console.log(options)
    //If 2 days have past, or LS not set, get info from API in regards to enumurated fields
    //And put into localStorage - setNumbers
    if (!this.elapsedTime.isInfoSet('enumList')) {
      return this.http.get(this.url + '/games/getfields', options)
        .mergeMap((data) => {
          this.elapsedTime.setItems('enumList', JSON.stringify(data.json()));
          // console.log(data.json())
          return this.getInfo(id);
        })
        .catch((error) => {
          return Observable.throw(error)
        })
    }
    else {
      // console.log("EnumList already set")

      return this.getInfo(id);
    }
    //
  }

  public getInfo(id: number): Observable<any> {
    this.enumList = JSON.parse(localStorage.getItem('enumList'));

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.url + '/games/getgame/' + id, options)
      .map((data) => {
        let result = data.json().data;
        this.items = result;
        this.setNumbers();
        // console.log(this.items)
        return this.items;
      })
      .catch((error) => {
        return Observable.throw(error)
      })


  }


  public setNumbers() {
    //  console.log(this.enumList)

    this.enumElements = this.enumElements
      .filter((arr) => {
        //get the object values where equal to element value
        if (this.items[0][arr[0]] == undefined) {
          //  console.log(this.items[0])
          return false;
        }
        return true;
      })
      .map(arr => {
        // console.log(this.enumElements)
        // console.log(this.items[0][arr[0]])
        return arr.concat(this.items[0][arr[0]])
      })
    this.matchFields()
  }
  public matchFields() {

    //Replaces numbers in o
    this.enumElements = this.enumElements.map(arr => {
      return [arr[0]].concat(arr.slice(1).map(val => {
        // Check if value of IDs are found in enumList array
        let found = this.enumList.find(field => arr[0] in field)[arr[0]].find(item => item.id === val);
        if (found) {
          return found.name
        }
      }))
    });
    //console.log(this.enumElements)
    this.cleanUpArray(this.enumElements);
  }
  public getList() {
    // console.log(this.enumElements)
    return this.enumElements
  }
  public cleanUpArray(arr) {
    return arr.map(ar => {
      if (ar[0].indexOf("_")) {
        // console.log('found')
        ar[0] = ar[0].replace('_', ' ')
      }
      for (var i = 0; i < ar.length; i++) {
        if (ar[i] == undefined) {
          ar.splice(i, 1);
          i--; // Prevent skipping an item
        }
      }

    })
  }
}
