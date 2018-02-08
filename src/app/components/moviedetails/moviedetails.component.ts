import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { ActivatedRoute, Params } from '@angular/router';
import {DetailsTrigger, TitleAnim} from '../../animations/preview';
import 'rxjs';
@Component({
  selector: 'app-moviedetails',
  templateUrl: './moviedetails.component.html',
  styleUrls: ['./moviedetails.component.css'],
  animations: [DetailsTrigger, TitleAnim]
})
export class MoviedetailsComponent implements OnInit {
  public loading: boolean = true;
  public catTitle = 'Loading Movie Data';
  public isActive:string = 'inActive';
  public item:Array<any> = [];
  public config:Array<any> = [];
  public url:string;
  public searchStr:string;
  @ViewChild ("bgContainer") bgContainer: ElementRef;
  constructor(private moviesService: MoviesService,
              private activatedRoute: ActivatedRoute,
              private renderer: Renderer2) { }

  ngOnInit() {
    this.activatedRoute.params
    .flatMap((params:Params)=>{
      this.searchStr = params['searchStr']
      return this.moviesService.getMovie(params['id']);
    })
    .subscribe((data)=>{
      this.config.push(JSON.parse(localStorage.getItem('configuration')));
      console.log(this.config)
      this.item = data;
      if(this.item[0].poster_path !== undefined){
        this.url = this.config[0].base_url+'/w500/'+this.item[0].poster_path
            }else{
              this.url =  "/assets/image404@2x.png";
          }
          setTimeout(()=>{
            this.isActive = 'active';
            this.loading = false;
            this.renderer.setStyle(this.bgContainer.nativeElement, 'background-image', 'url('+this.url+')')
          }, 800)
    })


  }

}
