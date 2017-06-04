import { Component, ViewChild, ElementRef, Renderer2} from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import {ActiveTrigger, containerTrigger} from '../../animations/preview';
import { AnimationEvent } from '@angular/animations';
@Component({
  selector: 'app-moviespreview',
  templateUrl: './moviespreview.component.html',
  styleUrls: ['./moviespreview.component.css'],
  animations: [ActiveTrigger, containerTrigger]
})
export class MoviespreviewComponent{
  public items:Array<any> = [];
  public config:any;
  public loading: boolean = true;
  public catTitle = 'Movie Cinema content';
  public isActive:string = 'inActive';
  public resize:string = 'inActive';


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
          setTimeout(()=>{
            this.isActive = 'active';
            this.loading = false;
          }, 200)
        }
    },err => {
        this.loading = false;
        console.log(err)
      }
    )
  }
 public catActive(event:AnimationEvent ){
   if(event.fromState != 'void'){
     return
   }
    this.resize = 'start';
  // console.log(event)

 }


}
