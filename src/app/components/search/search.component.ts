import { Component, OnInit } from '@angular/core';
import { Response} from "@angular/http";
import { SearchService } from '../../services/search.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
// import 'rxjs/';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
public searchStr = new BehaviorSubject<string>('');
// public result:Array<any> = [];
public movies:Array<any> = [];
public games:Array<any> = [];
public comics:Array<any> = [];
public albums:Array<any> = [];
  constructor(private searchService: SearchService) {
    this.searchService.search(this.searchStr)
    .subscribe((result)=> {
      if( this.searchStr.getValue().trim() !== '' ||  this.searchStr.getValue().length > 0){
          console.log(this.searchStr.getValue().length)
          this.movies = result[0];
          this.games = result[1];
          this.comics = result[2];
          this.albums = result[3];
          console.log(result)
      }



    })
   }

  ngOnInit() {

  }

}
