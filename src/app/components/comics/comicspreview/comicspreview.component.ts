import { Component, OnInit } from '@angular/core';
import { AnimationEvent } from '@angular/animations';
import { ComicsService } from '../../../services/comics.service';
import { TruncatePipe } from 'angular2-truncate';
import {ActiveTrigger, TitleAnim} from '../../../animations/preview';
@Component({
  selector: 'app-comicspreview',
  templateUrl: './comicspreview.component.html',
  styleUrls: ['./comicspreview.component.css'],
  animations: [ActiveTrigger, TitleAnim]
})
export class ComicspreviewComponent{
public items:Array<any> = [];
public loading: boolean = true;
public catTitle = 'Loading Comics content';
public isActive:string = 'inActive';
public playTitle:string = 'faded';

  constructor(private comicsService: ComicsService) { }

  ngAfterViewInit(){
    this.comicsService.getPreview(6).subscribe((data)=>{
      this.items = data[0].results;
      this.items = this.items.map(data=>{
        //  console.log(data.images[0])
        if(data.images[0] !== undefined){
            data.images[0].path = data.images[0].path+'/standard_fantastic.jpg'
              //
        }else{
          data.images[0] = {path:  "/assets/image404@2x.png"}
        }
        return data;
        })
      setTimeout(()=>{
        this.isActive = 'active';
        this.loading = false;
        this.playTitle = 'opaque';
      }, 300)

    // console.log(this.items[0].images[0].path+'/standard_fantastic.jpg')
    },err => {
      this.loading = false;
      console.log(err)
    })
  }

}
