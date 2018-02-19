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

  public items:Array<any> = [{}];
  public loading: boolean = true;
  public loadingMsg: string = "Loading Comics";
  public catTitle:string = "Latest Comics";
  public link:string = "/comic-details"
  public colClass: string = "col-md-2 col-4";
  // "col-md-2 col-4"
    constructor(private comicsService: ComicsService,
                private activatedRoute: ActivatedRoute,
                private router: Router) {}

    ngOnInit(){
      this.activatedRoute.params
      .flatMap(()=>{
        // console.log(params)
        //Get params incase we need to paginate
        return this.comicsService.getPreview(50)
      })
      .subscribe((data)=>{
        this.items = data[0].results;
        this.items = this.items.map(data=>{
          data.link = this.link
          if(data.images[0] !== undefined){
            data.img = data.images[0].path+"/standard_fantastic.jpg";
          }else{
              data.img = "assets/image404@2x.png";
          }
          return data;
          })
      },err => {
        this.loading = false;
        console.log(err)
      })
    }

}
