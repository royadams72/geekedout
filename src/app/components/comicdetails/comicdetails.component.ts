import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ComicsService } from '../../services/comics.service';
import {ActiveTrigger, TitleAnim} from '../../animations/preview';
import 'rxjs/add/operator/share';
import 'rxjs';
@Component({
  selector: 'app-comicdetails',
  templateUrl: './comicdetails.component.html',
  styleUrls: ['./comicdetails.component.css'],
  animations: [ActiveTrigger, TitleAnim]

})
export class ComicdetailsComponent implements OnInit {
  public item:any;
  public loading: boolean = true;
  public catTitle = 'Loading Comic';
  public isActive:string = 'inActive';
  public playTitle:string = 'faded';
  constructor(private activatedRoute: ActivatedRoute,
              private comicsService: ComicsService) { }

  ngOnInit() {
    this.activatedRoute.params
    .flatMap((value:Params, index:number)=>{
      return  this.comicsService.getItem(value['id']);
    })
    .subscribe((data)=>{
      this.item = data;
      console.log(data)
      setTimeout(()=>{
        this.isActive = 'active';
        this.playTitle = 'opaque'
        this.loading = false;
      }, 700)
    })
  }



}
