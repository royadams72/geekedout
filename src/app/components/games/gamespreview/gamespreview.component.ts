import { Component, OnInit } from '@angular/core';
import { GamesService } from '../../../services/games.service';
import {ActiveTrigger, TitleAnim} from '../../../animations/preview';
import { AnimationEvent } from '@angular/animations';
// import { LazyLoadImageModule } from 'ng-lazyload-image';
@Component({
  selector: 'app-gamespreview',
  templateUrl: './gamespreview.component.html',
  styleUrls: ['./gamespreview.component.css'],
  animations: [ActiveTrigger, TitleAnim]
})
export class GamespreviewComponent implements OnInit {
  public catTitle = 'Loading Games content';
  public items:Array<any> = [];
  public loading:boolean = true;
  public isActive:string = 'inActive';
  public showTitle:string = 'false';
    constructor(private gamesService: GamesService) { }

    ngOnInit(){
      // this.gamesService.getItems(6).subscribe((data)=>{
      //   this.items = data;
      //   this.items = this.items.map(data=>{
      //     if(data.cover.cloudinary_id !== undefined){
      //         data.cover.cloudinary_id = 'https://images.igdb.com/igdb/image/upload/t_cover_big/'+data.cover.cloudinary_id+'.jpg'
      //     }else{
      //       data.cover = {cloudinary_id: "/assets/image404@2x.png"}
      //     }
      //     return data;
      //     })
      //   setTimeout(()=>{
      //     this.loading = false;
      //     this.isActive = 'active';
      //     this.showTitle = 'true';
      //   }, 400)
      // },err => {

      //   console.log(err)
      // })
    }
    public catActive(event:AnimationEvent ){
      if(event.fromState != 'void'){
        return
      }

      //console.log(event)

    }
}
