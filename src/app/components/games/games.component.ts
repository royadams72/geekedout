import { Component, OnInit } from '@angular/core';
import { GamesService } from '../../services/games.service';
import { ActiveTrigger, TitleAnim } from '../../animations/preview';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs';
@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css'],
  animations: [ActiveTrigger, TitleAnim]
})
export class GamesComponent implements OnInit {
  public catTitle = 'Loading Games content';
  public loading: boolean = true;
  public items:Array<any> = [];
  public isActive:string = 'inActive';
  public playTitle:string = 'faded';

  constructor(private gamesService: GamesService,
              private activatedRoute: ActivatedRoute) { }
  ngOnInit() {
    this.activatedRoute.params
    .flatMap((params:Params)=>{
      return this.gamesService.getItems(50)
    })
    .subscribe((data)=>{
      if(data){
  //  console.log(data)
      // data.json().data.albums.items
      this.items = data;
      this.items = this.items.map(data=>{
        if(data.cover != undefined){
            data.cover.cloudinary_id = 'https://images.igdb.com/igdb/image/upload/t_cover_big/'+data.cover.cloudinary_id+'.jpg'
        }
        return data;
        })
      }
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
