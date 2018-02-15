import { Component, ViewChild, ElementRef, Renderer2} from '@angular/core';
import { AnimationEvent } from '@angular/animations';
import { MoviesService } from '../../../services/movies.service';
import {ActiveTrigger, TitleAnim, LoaderAnim} from '../../../animations/preview';
@Component({
  selector: 'app-moviespreview',
  templateUrl: './moviespreview.component.html',
  styleUrls: ['./moviespreview.component.css'],
  animations: [ActiveTrigger, TitleAnim, LoaderAnim]
})
export class MoviespreviewComponent{
  public items:Array<any> = [];
  public config:any;
  public loading: boolean = true;
  public catTitle = 'Loading Content';
  public isActive:string = 'inActive';
  public playTitle:string = 'faded';
  public showloader:string = 'opaque';

  constructor(private moviesService: MoviesService) {

    //console.log(myItem)
   }

  ngAfterViewInit(){
    this.moviesService.getMovie('preview')
    .subscribe((data)=>{
        if(data){
          this.config = JSON.parse(localStorage.getItem('configuration'));

          this.items = data;

          this.items = this.items.map(data=>{
            // console.log(data);
            if(data.poster_path !== undefined){
                data.poster_path = this.config.base_url+'w780'+data.poster_path;
                  // console.log(data.poster_path)
                  }else{
                  data.poster_path = "/assets/image404@x2.png";
                  }
            return data;
            })
          setTimeout(()=>{
            this.isActive = 'active';
            this.playTitle = 'opaque';
            this.showloader = 'faded';
            this.loading = false;
          }, 200)
        }
    },err => {
        this.loading = false;
        console.log(err)
      }
    )
  }



}
