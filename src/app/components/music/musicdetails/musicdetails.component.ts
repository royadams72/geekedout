import { Component, OnInit, ViewChild, ElementRef, Renderer2} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MusicService } from '../../../services/music.service';
import {DetailsTrigger, TitleAnim} from '../../../animations/preview';
import 'rxjs';
@Component({
  selector: 'app-musicdetails',
  templateUrl: './musicdetails.component.html',
  styleUrls: ['./musicdetails.component.css'],
  animations: [DetailsTrigger, TitleAnim]
})
export class MusicdetailsComponent implements OnInit {
  public loading: boolean = true;
  public catTitle = 'Loading Album Data';
  public isActive:string = 'inActive';
  public playTitle:string = 'faded';
  public item:Array<any> = [];
  public url:string;
  public searchStr:string;
  @ViewChild ("bgContainer") bgContainer: ElementRef;
  constructor(private musicService: MusicService,
              private activatedRoute: ActivatedRoute,
              private renderer: Renderer2) { }

  ngOnInit() {
    this.activatedRoute.params
    .flatMap((params:Params)=>{
      this.searchStr = params['searchStr']
      console.log(this.searchStr);

      return this.musicService.getItem(params['id']);
    })
    .subscribe((data)=>{
      this.item.push(data);
      if( this.item[0].images[0] !== undefined ){
        this.url = this.item[0].images[0].url
        }else{
          this.url = '/assets/image404@2x.png';
        }

      setTimeout(()=>{
        this.isActive = 'active';
        this.loading = false;
        this.playTitle = 'opaque';

        this.renderer.setStyle(this.bgContainer.nativeElement, 'background-image', 'url('+this.url+')')
      }, 700)
    })
  }

}
