import { Component, OnInit, ViewChild, ElementRef, Renderer2} from '@angular/core';
import { GamesService } from '../../services/games.service';
import { ActivatedRoute, Params } from '@angular/router';
import {ActiveTrigger, TitleAnim} from '../../animations/preview';
import 'rxjs';
@Component({
  selector: 'app-gamesdetails',
  templateUrl: './gamesdetails.component.html',
  styleUrls: ['./gamesdetails.component.css'],
  animations: [ActiveTrigger, TitleAnim]
})
export class GamesdetailsComponent implements OnInit {
  public catTitle = 'Loading Games content';
  public loading: boolean = true;
  public item:Array<any> = [];
  public isActive:string = 'inActive';
  public playTitle:string = 'faded';
  public infoArray:any;
  public enumElements:Array<any>;
  @ViewChild ("container") container: ElementRef
  constructor(private gamesService: GamesService,
              private activatedRoute: ActivatedRoute,
              private renderer: Renderer2) { }

  ngOnInit() {
    this.activatedRoute.params
    .flatMap((params:Params)=>{
      return this.gamesService.getItem(params['id'])
    })
    .subscribe((data)=>{
      this.item = data;
      this.enumElements = this.gamesService.getList()
      console.log(this.item[0].cover.cloudinary_id)
      let body = this.renderer.parentNode(this.renderer.parentNode(this.renderer.parentNode(this.container.nativeElement)))
      setTimeout(()=>{
        this.isActive = 'active';
        this.loading = false;
        this.playTitle = 'opaque';
        // this.renderer.listen('body','onLoad', (event: any) => {body.backgroundImage = 'https://images.igdb.com/igdb/image/upload/t_cover_big/'+this.item[0].cover.cloudinary_id+'.jpg'})
        this.renderer.setStyle(body,'background-image', 'url(https://images.igdb.com/igdb/image/upload/t_cover_big/'+this.item[0].cover.cloudinary_id+'.jpg)')
          console.log()
      }, 300)

    //  console.log(data)
    },err => {
      this.loading = false;
      console.log(err)
    })
  }

}
