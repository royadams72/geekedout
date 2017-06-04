import { Component, OnInit } from '@angular/core';
import { GamesService } from '../../services/games.service';
import {ActiveTrigger, containerTrigger} from '../../animations/preview';
import { AnimationEvent } from '@angular/animations';
@Component({
  selector: 'app-gamespreview',
  templateUrl: './gamespreview.component.html',
  styleUrls: ['./gamespreview.component.css'],
  animations: [ActiveTrigger, containerTrigger]
})
export class GamespreviewComponent implements OnInit {
  public catTitle = 'Loading Games content';
  public loading: boolean = true;
  public items:Array<any> = [];
  public isActive:string = 'inActive';
  public resize:string = 'inActive';
    constructor(private gamesService: GamesService) { }

    ngOnInit(){
      this.gamesService.getPreview().subscribe((data)=>{
        this.items = data;

        setTimeout(()=>{
          this.loading = false;
          this.isActive = 'active';

        }, 400)
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
      //console.log(event)

    }
}
