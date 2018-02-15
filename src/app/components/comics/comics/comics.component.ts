import { Component, OnInit } from '@angular/core';
import { AnimationEvent} from '@angular/animations';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ComicsService } from '../../../services/comics.service';
import { TruncatePipe } from 'angular2-truncate';
import {ActiveTrigger, TitleAnim, LoaderAnim} from '../../../animations/preview';
// import { ImageDirective } from '../../utils/Image.directive';
@Component({
  selector: 'app-comics',
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.css'],
  animations: [ActiveTrigger, TitleAnim, LoaderAnim]
})
export class ComicsComponent implements OnInit {

  public items:Array<any> = [];
  public loading: boolean = true;
  public catTitle = 'Loading Comics content';
  public isActive:string = 'inActive';
  public playTitle:string = 'faded';
  public showloader:string = 'opaque';

    constructor(private comicsService: ComicsService,
                private activatedRoute: ActivatedRoute,
                private router: Router) {}

    ngOnInit(){
      this.activatedRoute.params
      .switchMap(()=>{
        // console.log(params)
        return this.comicsService.getPreview(50)
      })
      .subscribe((data)=>{
        this.items = data[0].results;
        this.items = this.items.map(arr=>{
          if(arr.images[0] !== undefined){
            arr.images[0].path = arr.images[0].path+"/standard_fantastic.jpg";
          }else{
              arr.images[0].path = "assets/image404@2x.png";
          }
          return arr;
          })
        setTimeout(()=>{
          this.isActive = 'active';
          this.loading = false;
          this.playTitle = 'opaque';
          this.showloader = 'faded';
          // console.log(this.showloader, this.playTitle)
        }, 300);
      },err => {
        this.loading = false;
        console.log(err)
      })
    }

}
