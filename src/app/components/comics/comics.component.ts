import { Component, OnInit } from '@angular/core';
import { ComicsService } from '../../services/comics.service';
import { TruncatePipe } from 'angular2-truncate';
import {ActiveTrigger, containerTrigger} from '../../animations/preview';
import { AnimationEvent } from '@angular/animations';
@Component({
  selector: 'app-comics',
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.css'],
  animations: [ActiveTrigger, containerTrigger]
})
export class ComicsComponent implements OnInit {

  public items:Array<any> = [];
  public loading: boolean = true;
  public catTitle = 'Loading Comics content';
  public isActive:string = 'inActive';
  public resize:string = 'inActive';

    constructor(private comicsService: ComicsService) { }

    ngOnInit(){
      this.comicsService.getPreview('24').subscribe((data)=>{
        this.items = data;
        //console.log(this.items)
        setTimeout(()=>{
          this.isActive = 'active';
          this.loading = false;
        }, 300)

      //  console.log(data)
      },err => {
        this.loading = false;
        console.log(err)
      })
    }
}
