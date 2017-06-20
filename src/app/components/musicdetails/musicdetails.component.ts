import { Component, OnInit } from '@angular/core';
import { MusicService } from '../../services/music.service';
import { ActivatedRoute, Params } from '@angular/router';
import {ActiveTrigger, TitleAnim} from '../../animations/preview';
import 'rxjs';
@Component({
  selector: 'app-musicdetails',
  templateUrl: './musicdetails.component.html',
  styleUrls: ['./musicdetails.component.css'],
  animations: [ActiveTrigger, TitleAnim]
})
export class MusicdetailsComponent implements OnInit {
  public loading: boolean = true;
  public catTitle = 'Loading Album Data';
  public isActive:string = 'inActive';
  public playTitle:string = 'faded';
  public item:Array<any> = [];
  constructor(private musicService: MusicService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params
    .flatMap((value:Params)=>{
      return this.musicService.getItem(value['id']);
    })
    .subscribe((data)=>{

      this.item.push(data);
        console.log(this.item)
      setTimeout(()=>{
        this.isActive = 'active';
        this.loading = false;
        this.playTitle = 'opaque';
      }, 700)
    })
  }

}
