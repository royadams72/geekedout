import { Component, ViewChild, ElementRef, Renderer2} from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import {ActiveTrigger, TitleAnim} from '../../animations/preview';
import { AnimationEvent } from '@angular/animations';
@Component({
  selector: 'app-moviespreview',
  templateUrl: './moviespreview.component.html',
  styleUrls: ['./moviespreview.component.css'],
  animations: [ActiveTrigger, TitleAnim]
})
export class MoviespreviewComponent{
  public items:Array<any> = [];
  public config:any;
  public loading: boolean = true;
  public catTitle = 'Movie Cinema content';
  public isActive:string = 'inActive';
  public playTitle:string = 'faded';


  constructor(private moviesService: MoviesService) {

    //console.log(myItem)
   }

  ngAfterViewInit(){
    this.moviesService.getMovie('preview')
    .subscribe((data)=>{
        if(data){
          this.config = JSON.parse(localStorage.getItem('configuration'));
          //console.log(this.config);
          this.items = data;
          this.items = this.items.map(data=>{
            if(data.poster_path !== undefined){
                data.poster_path = this.config.base_url+'w780'+data.poster_path;
                  // console.log(data.poster_path)
            }
            return data;
            })
          setTimeout(()=>{
            this.isActive = 'active';
            this.playTitle = 'opaque';
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
