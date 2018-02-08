import { Component, OnInit, ViewChild, ElementRef, Renderer2} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ComicsService } from '../../services/comics.service';
import {DetailsTrigger, TitleAnim} from '../../animations/preview';
import 'rxjs/add/operator/share';
import 'rxjs';
@Component({
  selector: 'app-comicdetails',
  templateUrl: './comicdetails.component.html',
  styleUrls: ['./comicdetails.component.css'],
  animations: [DetailsTrigger, TitleAnim]

})
export class ComicdetailsComponent implements OnInit {
  public item:any;
  public loading: boolean = true;
  public catTitle = 'Loading Comic';
  public isActive:string = 'inActive';
  public playTitle:string = 'faded';
  public url:string
  public searchStr:string;
  @ViewChild ("bgContainer") bgContainer: ElementRef;

  constructor(private activatedRoute: ActivatedRoute,
              private comicsService: ComicsService,
              private renderer: Renderer2) { }

  ngOnInit() {
    this.activatedRoute.params
    .flatMap((params:Params)=>{
      console.log(params)
      this.searchStr = params['searchStr']
      //
      return  this.comicsService.getItem(params['id']);
    })
    .subscribe((data)=>{
      this.item = data;
        if(this.item.images[0] !== undefined){
          this.url = this.item.images[0].path+'.'+this.item.images[0].extension;
          console.log(this.url)
          }else{
            this.url = '/assets/image404@2x.png';
        }
      setTimeout(()=>{
        this.isActive = 'active';
        this.playTitle = 'opaque'
        this.loading = false;
        this.renderer.setStyle(this.bgContainer.nativeElement, 'background-image', 'url('+this.url+')')
      }, 700)
    })
  }



}
