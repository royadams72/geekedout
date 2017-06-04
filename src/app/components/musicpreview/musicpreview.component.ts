import { Component, OnInit } from '@angular/core';
import { MusicService } from '../../services/music.service';
import {ActiveTrigger, containerTrigger} from '../../animations/preview';
import { AnimationEvent } from '@angular/animations';
@Component({
  selector: 'app-musicpreview',
  templateUrl: './musicpreview.component.html',
  styleUrls: ['./musicpreview.component.css'],
  animations: [ActiveTrigger, containerTrigger]
})
export class MusicpreviewComponent implements OnInit {
  public catTitle = 'Loading Music content';
  public loading: boolean = true;
  public items:Array<any> = [];
  public isActive = 'inActive';
  public resize:string = 'inActive';
  constructor(private musicService: MusicService) { }
    ngOnInit(){
      this.musicService.getPreview().subscribe((data)=>{
        if(data){
          this.items = data;

        }
        setTimeout(()=>{
          this.loading = false;
          this.isActive = 'active';

        }, 500)
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
    //  console.log(event)

    }
}
