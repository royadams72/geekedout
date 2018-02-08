import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { GamesService } from '../../services/games.service';
import { ActivatedRoute, Params } from '@angular/router';
import {DetailsTrigger, TitleAnim} from '../../animations/preview';

import 'rxjs';
@Component({
  selector: 'app-gamesdetails',
  templateUrl: './gamesdetails.component.html',
  styleUrls: ['./gamesdetails.component.css'],
  animations: [ DetailsTrigger, TitleAnim ]
})
export class GamesdetailsComponent implements OnInit {
  public catTitle = 'Loading Games content';
  public loading: boolean = true;
  public item:Array<any> = [];
  public isActive:string = 'inActive';
  public playTitle:string = 'faded';
  public infoArray:any;
  public enumElements:Array<any>;
  public url:string
  public searchStr:string;
  @ViewChild ("bgContainer") bgContainer: ElementRef;

  constructor(private gamesService: GamesService,
              private activatedRoute: ActivatedRoute,
              private renderer: Renderer2) { }

  ngOnInit() {

    this.activatedRoute.params
    .flatMap((params:Params)=>{
      this.searchStr = params['searchStr']
      return this.gamesService.getItem(params['id'])
    })
    .subscribe((data)=>{
      this.item = data;
      this.enumElements = this.gamesService.getList();
      if(this.item[0].cover === undefined){
        this.url = '/assets/image404@2x.png'
          }else{
          this.url = 'https://images.igdb.com/igdb/image/upload/t_cover_big/'+this.item[0].cover.cloudinary_id+'.jpg'
          }
        setTimeout(()=>{
          this.isActive = 'active';
          this.loading = false;
          this.playTitle = 'opaque';
          this.renderer.setStyle(this.bgContainer.nativeElement, 'background-image', 'url('+this.url+')')
          }, 300)

    //
    },err => {
      this.loading = false;
      console.log(err)
    })
  }

}
