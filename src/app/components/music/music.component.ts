import { Component, OnInit } from '@angular/core';
import { ActiveTrigger, TitleAnim, LoaderAnim } from '../../animations/preview';
import { AnimationEvent} from '@angular/animations';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MusicService } from '../../services/music.service';
import 'rxjs';
@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.css'],
  animations: [ActiveTrigger, TitleAnim, LoaderAnim]
})
export class MusicComponent implements OnInit {
  public items:Array<any> = [];
  public loading: boolean = true;
  public catTitle = 'Loading Latest Albums';
  public isActive:string = 'inActive';
  public playTitle:string = 'faded';
  public showloader:string = 'opaque';
  constructor(private musicService: MusicService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params
    .flatMap((params:Params)=>{
      return this.musicService.getPreview(50)
    })
    .subscribe((data)=>{
    //  console.log(data.albums.items)
      this.items = data.albums.items;
        this.items = this.items.map(data=>{
        if(data.images[0] === undefined || data.images[0].url === ""){
            data.images[0].url  = "/assets/image404@2x.png";
            }
              return data;
              })
        setTimeout(()=>{
          this.isActive = 'active';
          this.loading = false;
          this.playTitle = 'opaque';
          this.showloader = 'faded';
        }, 300)

    },err => {
      this.loading = false;
      console.log(err)
    })
  }

}
