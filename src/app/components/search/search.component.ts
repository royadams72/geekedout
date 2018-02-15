import { Component, OnInit } from '@angular/core';
import { Response} from "@angular/http";
import { SearchService } from '../../services/search.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { TruncatePipe2 } from '../../utils/truncate.pipe';
import { ActivatedRoute } from '@angular/router';
import { LoaderAnim } from '../../animations/preview';
// import 'rxjs/';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  animations: [ LoaderAnim ]
})
export class SearchComponent {
public catTitle = 'Loading Search Please Wait';
public searchStr = new BehaviorSubject<string>('');
public movies:Array<any> = [];
public games:Array<any> = [];
public comics:Array<any> = [];
public albums:Array<any> = [];
public config:Array<any> = [];
public resultCount:number;
public useBgM:boolean;
public useBgG:boolean;
public returnStr:string;
public loading:boolean;
public showloader:string = 'faded';
  constructor(private searchService: SearchService, private route: ActivatedRoute) {
    //*If returning from detail page*//
    let str = this.route.snapshot.params['searchStr'];
    if(str !== undefined){
      this.returnStr = str;
      this.searchStr.next(str)
      console.log(str)
    }
    //*****************************//
    this.searchService.search(this.searchStr)
    .do(() => {this.loading = true; console.log(this.loading)})
    .subscribe((result)=> {
      // this.loading = true
      // console.log(this.loading)
      if( this.searchStr.getValue().trim() !== '' ||  this.searchStr.getValue().length > 0 ){
        setTimeout(()=>{
          this.loading = false;
          console.log(this.loading)
          this.resultCount = 0;
          this.handleMovies(result[0]);
          this.handleGames(result[1]);
          this.handleComics(result[2]);
          this.handleMusic(result[3]);
          // this.showloader = 'faded';
        }, 1400)
            //console.log(result);

      }
    })
   }

   public handleMovies(arr){
     this.config.push(JSON.parse(localStorage.getItem('configuration')));
     this.movies = arr;
     this.incrementCount(arr);
    }

   public handleGames(arr){
     console.log(arr)
     this.games = arr;
     this.games = this.games.map(data=>{
       if(data.cover != undefined){
           data.cover.cloudinary_id = 'https://images.igdb.com/igdb/image/upload/t_cover_small/'+data.cover.cloudinary_id+'.jpg'
       }
       return data;
       })
        this.incrementCount(arr);
   }
   public handleComics(arr){
     this.comics = arr;
    //  console.log(this.comics)
     this.incrementCount(arr);
   }

   public handleMusic(arr){
     this.albums = arr;
     //console.log(this.albums);
      this.incrementCount(arr);

   }
   public incrementCount(arr){
        this.useBgG = false;
        this.useBgM = false;
        // console.log("use bg")
        arr.length > 0 ?  this.resultCount++ : this.resultCount = this.resultCount;

        if((this.resultCount%3) === 0 || (this.resultCount%3) === 0 && (this.resultCount%2) === 0){
            this.useBgG = true;
        }else{
            this.useBgG = true;
            this.useBgM = true;
        }
      // console.log((this.resultCount%3)===0, "resultCount= "+this.resultCount, this.useBgM )
   }


}
