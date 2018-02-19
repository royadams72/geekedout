import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';

import { ActivatedRoute, Params } from '@angular/router';
import { MoviesService } from '../../../services/movies.service';
import {DetailsTrigger, TitleAnim} from '../../../animations/preview';
import 'rxjs';
@Component({
  selector: 'app-moviedetails',
  templateUrl: './moviedetails.component.html',
  styleUrls: ['./moviedetails.component.css'],
  animations: [DetailsTrigger, TitleAnim]
})
export class MoviedetailsComponent implements OnInit {
  public loading: boolean = true;
  public catTitle = 'Loading Movie Data';
  public isActive:string = 'inActive';
  public item:Array<any> = [];
  public config:Array<any> = [];
  public url:string;
  public searchStr:string;
  public pageNum: number;
  public query:{};
  @ViewChild ("bgContainer") bgContainer: ElementRef;
  constructor(private moviesService: MoviesService,
              private activatedRoute: ActivatedRoute,
              private renderer: Renderer2) { }

  ngOnInit() {
    //Used optional parameters, not using pagination at the momnent
    //But wanted to have something in place for when I do
    //Without having to hardcode essential route params, in to the app.routing class
    this.activatedRoute.queryParams
    .switchMap((query)=>{
      //Use switchMap to get query details returned
      //And update the query object with the the search or page number
      //This is for back button
      this.searchStr = query.searchStr;
      if (query.searchStr !== undefined){
        this.query = { searchStr: query.searchStr }
      }else{
        this.query = { pageNum: query.pageNum }
      }
      return this.moviesService.getMovies(query.id);
    })
    .subscribe((data)=>{
      this.config.push(JSON.parse(localStorage.getItem('configuration')));
      // console.log(this.config)
      this.item = data;
      if(this.item[0].poster_path !== undefined){
        this.url = this.config[0].base_url+'/w500/'+this.item[0].poster_path
            }else{
              this.url =  "/assets/image404@2x.png";
          }
          setTimeout(()=>{
            this.isActive = 'active';
            this.loading = false;
            this.renderer.setStyle(this.bgContainer.nativeElement, 'background-image', 'url('+this.url+')')
          }, 800)
    })


  }

}
