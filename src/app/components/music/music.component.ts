import { Component, OnInit } from '@angular/core';
import { ActiveTrigger, TitleAnim } from '../../animations/preview';
import { AnimationEvent} from '@angular/animations';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MusicService } from '../../services/music.service';
import 'rxjs';
@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.css'],
  animations: [ActiveTrigger, TitleAnim]
})
export class MusicComponent implements OnInit {
  public items:Array<any> = [];
  public loading: boolean = true;
  public catTitle = 'Loading Latest Albums';
  public isActive:string = 'inActive';
  public playTitle:string = 'faded';
  constructor(private musicService: MusicService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params
    .flatMap((params:Params)=>{
      return this.musicService.getPreview(50)
    })
    .subscribe((data)=>{
    //  console.log(data.albums.items)
      // data.json().data.albums.items
      this.items = data.albums.items;
      setTimeout(()=>{
        this.isActive = 'active';
        this.loading = false;
        this.playTitle = 'opaque';
      }, 300)

    //  console.log(data)
    },err => {
      this.loading = false;
      console.log(err)
    })
  }

}
