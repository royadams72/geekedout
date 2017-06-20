import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { ActivatedRoute, Params } from '@angular/router';
import {ActiveTrigger, TitleAnim} from '../../animations/preview';
import 'rxjs';
@Component({
  selector: 'app-moviedetails',
  templateUrl: './moviedetails.component.html',
  styleUrls: ['./moviedetails.component.css'],
  animations: [ActiveTrigger, TitleAnim]
})
export class MoviedetailsComponent implements OnInit {
  public loading: boolean = true;
  public catTitle = 'Loading Movie Data';
  public isActive:string = 'inActive';
  public item:Array<any> = [];
  public config:Array<any> = [];
  constructor(private moviesService: MoviesService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params
    .flatMap((value:Params, index:number)=>{
      return this.moviesService.getMovie(value['id']);
    })
    .subscribe((data)=>{
      this.config.push(JSON.parse(localStorage.getItem('configuration')));
      console.log(this.config)
      this.item = data;
      setTimeout(()=>{
        this.isActive = 'active';
        this.loading = false;
      }, 700)
    })


  }

}
