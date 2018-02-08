import { Component, OnInit } from '@angular/core';
import { MusicService } from '../../services/music.service';
import {ActiveTrigger, TitleAnim} from '../../animations/preview';
import { AnimationEvent } from '@angular/animations';
@Component({
  selector: 'app-musicpreview',
  templateUrl: './musicpreview.component.html',
  styleUrls: ['./musicpreview.component.css'],
  animations: [ActiveTrigger, TitleAnim]
})
export class MusicpreviewComponent implements OnInit {
  public catTitle = 'Loading Music content';
  public loading: boolean = true;
  public items:Array<any> = [];
  public isActive = 'inActive';
  public playTitle:string = 'faded';
  constructor(private musicService: MusicService) { }
    ngOnInit(){
      this.musicService.getPreview(4).subscribe((data)=>{
        if(data){
          this.items = data.albums.items;
            this.items = this.items.map(data=>{
              // console.log(data.images[0])
              if(data.images[0] === undefined || data.images[0].url === ""){
                data.images[0].url  = "/assets/image404@2x.png";
                }
              return data;
              })
            setTimeout(()=>{
              this.loading = false;
              this.isActive = 'active';
              this.playTitle = 'opaque';
              }, 300)
        }

      },err => {
        this.loading = false;
        console.log(err)
      })
    }
    public catActive(event:AnimationEvent ){
      if(event.fromState != 'void'){
        return
      }
    //  console.log(event)

    }
}
