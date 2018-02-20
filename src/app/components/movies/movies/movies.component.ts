import { Component, OnInit } from '@angular/core';
import { AnimationEvent } from '@angular/animations';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { MoviesService } from '../../../services/movies.service';
import {ActiveTrigger, TitleAnim, LoaderAnim } from '../../../animations/preview';
import { Props } from '../../../models/props';
import { isObject, isEmpty } from '../../../utils/checkObjs'

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
  animations: [ActiveTrigger, TitleAnim, LoaderAnim ]
})
export class MoviesComponent implements OnInit {
  public props:Props;
  public items:Array<any> = [];
  public config:any;
  public loadingMsg: string = "Loading Movies";
  public catTitle:string = "Movies in Cinemas Now";
  public link:string;
  public pageNum: number = 1;
  private state: string = 'preview';//Is used to toggle vars in this class, also a param, for getMovies, in service
  public colClass: string = "col-md-3 col-sm-6";
  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private moviesService: MoviesService) {}

  ngOnInit() {
    //Used optional parameters, not using pagination at the momnent
    //But wanted to have something in place for when I do
    //Without having to hardcode essential route params, in to the app.routing class
    this.activatedRoute.queryParams
    //Use switchMap to get query details returned
    //If the query object is is empty
    //Set pageNum to 1
    //Else set state to showAll and get the
    //pageNum from the pageNum in the query
    .switchMap((query)=>{
      if (!isEmpty(query)){
        this.state = 'showAll'
        this.pageNum = +query.pageNum;
      }
  return this.moviesService.getMovies(this.state, this.pageNum)
    })
    .subscribe((data)=>{
        if(data){
          console.log(data)
          this.config = JSON.parse(localStorage.getItem('configuration'));
          if(this.state === 'showAll'){
            //Need to slightly change how we get results, as there are more
            //details/properties that need to be returned
            this.items = data.results;
          }else{
            this.items = data
          }
            this.items = this.items.map(data=>{
          //Add custom properties to retured object - img and link
          //Make sure this is done across all parent components using app-category
          //As this will dsiplay image and enable correct link/click through for detail page
        if(this.state === 'showAll'){
        // setup optional parameters
          data.link = '/movie-details';
          data.query = { pageNum:this.pageNum, id:data.id };
        }else{
          data.link = '/movies';
          data.query = { pageNum:this.pageNum };
        }
          // console.log(data.id)
            if(data.poster_path !== undefined){
                data.img = this.config.base_url+'w500'+data.poster_path;
              }else{
              data.img = "/assets/image404@2x.png";
              }
            return data;
            })
            //Populate the props object, for the app-category component selector
            this.props = {
              items: this.items,
              catTitle: this.catTitle,
              loadingMsg: this.loadingMsg,
              colClass: this.colClass
            };
        }
    },err => {

        console.log(err)
      }
    )
  }

}
