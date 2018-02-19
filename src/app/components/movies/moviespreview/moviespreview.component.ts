import { Component, ViewChild, ElementRef, Renderer2} from '@angular/core';
import { AnimationEvent } from '@angular/animations';
import { Router, ActivatedRoute, Params, NavigationEnd, UrlSegment} from '@angular/router';
import { MoviesService } from '../../../services/movies.service';
import {ActiveTrigger, TitleAnim, LoaderAnim} from '../../../animations/preview';
import { Props } from '../../../models/props';
import { getRoutes } from '../../../utils/router';
@Component({
  selector: 'app-moviespreview',
  templateUrl: './moviespreview.component.html',
  styleUrls: ['./moviespreview.component.css'],
  animations: [ActiveTrigger, TitleAnim, LoaderAnim]
})
export class MoviespreviewComponent{
  public props:Props;
  private items:Array<any> = [];
  private config:any;
  private loadingMsg: string = "Loading Movies";
  private catTitle:string = "Movies in Cinemas Now";
  private link:string = "/movies, page:1"
  private colClass: string = "col-md-3 col-sm-6";

  constructor(private activatedRoute: ActivatedRoute, private moviesService: MoviesService, private router: Router) {

    //console.log(myItem)
   }

  ngAfterViewInit(){
    let segments = getRoutes(this.activatedRoute)

console.log(segments)
    this.activatedRoute.url
    .flatMap((params:Params)=>{
      console.log(params)
      //Get params incase we need to paginate
     return this.moviesService.getMovie('preview')
    })

    .subscribe((data)=>{
        if(data){
          this.config = JSON.parse(localStorage.getItem('configuration'));

          this.items = data;

          this.items = this.items.map(data=>{
            data.link = this.link
            // console.log(data);
            if(data.poster_path !== undefined){
                data.img = this.config.base_url+'w780'+data.poster_path;
                  // console.log(data.poster_path)
                  }else{
                  data.img = "/assets/image404@x2.png";
                  }
            return data;
            })
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
// getRoutes() {
//   const segments: UrlSegment[] = this.activatedRoute.snapshot.url;
// console.log(segments)
// }


}
