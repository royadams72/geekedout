import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComicsService } from '../../services/comics.service';
import {ActiveTrigger, containerTrigger} from '../../animations/preview';

import {CapitalizePipe} from "../../utils/pipes/capitalise.pipe";
import 'rxjs/add/operator/share';
import 'rxjs';
@Component({
  selector: 'app-comicdetails',
  templateUrl: './comicdetails.component.html',
  styleUrls: ['./comicdetails.component.css'],
  animations: [ActiveTrigger, containerTrigger]

})
export class ComicdetailsComponent implements OnInit {
  public item:any;
  public loading: boolean = true;
  public catTitle = 'Loading Comic';
  public isActive:string = 'inActive';
  public counter:number;
  constructor(private activatedRoute: ActivatedRoute, private comicsService: ComicsService) { }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.params.id;
    this.item = this.comicsService.getItem(id).share();
    setTimeout(()=>{
      this.isActive = 'active';
      this.loading = false;
    }, 700)

  }
}
