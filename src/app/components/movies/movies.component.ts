
import { Component, OnInit } from '@angular/core';
// import { PagerComponent } from '../pagers/pager-movies/pager.component';
import { MoviesService } from '../../services/movies.service';
import {ActiveTrigger, TitleAnim } from '../../animations/preview';
import { AnimationEvent } from '@angular/animations';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
  animations: [ActiveTrigger, TitleAnim ]
})
export class MoviesComponent implements OnInit {
  public items:Array<any> = [];
  public config:any;
  public divHeights:Array<any> = [];
  public loading: boolean;
  public catTitle:string;
  public isActive:string;
  public playTitle:string = 'faded';
  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private moviesService: MoviesService) {}

  ngOnInit() {
  //let el = this.element.nativeElement;

    this.activatedRoute.params
    .flatMap((params:Params, index:number)=>{
      this.loadPage();

      return this.moviesService.getMovie('showAll', params['pageNum'])
    })

    .subscribe((data)=>{
        if(data){
          this.config = JSON.parse(localStorage.getItem('configuration'));
          this.items = data.results;
            console.log(this.config)
          this.items = this.items.map(data=>{
            if(data.poster_path !== undefined){
                data.poster_path = this.config.base_url+'w500'+data.poster_path;
            }
            return data;
            })

        //  this.total_pages =  data.total_pages;
          setTimeout(()=>{
          this.playTitle = 'opaque';
          this.isActive = 'active';
          this.loading = false;
          }, 800)
        }
    },err => {
        this.loading = false;
        console.log(err)
      }
    )


  }


  public loadPage(){
    this.loading = true;
    this.catTitle = 'Loading Movie content';
    this.isActive= 'inActive';
  }
}
