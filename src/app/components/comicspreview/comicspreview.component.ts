import { Component, OnInit } from '@angular/core';
import { ComicsService } from '../../services/comics.service';
import { TruncatePipe } from 'angular2-truncate';
import {ActiveTrigger, containerTrigger} from '../../animations/preview';
import { AnimationEvent } from '@angular/animations';
@Component({
  selector: 'app-comicspreview',
  templateUrl: './comicspreview.component.html',
  styleUrls: ['./comicspreview.component.css'],
  animations: [ActiveTrigger, containerTrigger]
})
export class ComicspreviewComponent implements OnInit {
public items:Array<any> = [];
public loading: boolean = true;
public catTitle = 'Loading Comics content';
public isActive:string = 'inActive';
public resize:string = 'inActive';

  constructor(private comicsService: ComicsService) { }

  ngOnInit(){
    this.comicsService.getPreview('6').subscribe((data)=>{
      this.items = data;
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
  public catActive(event:AnimationEvent ){
    if(event.fromState != 'void'){
      return
    }
     this.resize = 'start';


  }
}
