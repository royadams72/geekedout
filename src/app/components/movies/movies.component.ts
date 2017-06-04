import { Component, OnInit, ElementRef, ViewChildren, ViewChild, Renderer2} from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import {ActiveTrigger, containerTrigger} from '../../animations/preview';
import { AnimationEvent } from '@angular/animations';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
  animations: [ActiveTrigger, containerTrigger]
})
export class MoviesComponent implements OnInit {
  public items:Array<any> = [];
  public config:any;
  public divHeights:Array<any> = [];
  public loading: boolean = true;
  public catTitle = 'Movie Cinema content';
  public isActive:string = 'inActive';
  public pageNum:number;
  public timeOut = null;
  @ViewChild('parentDiv') parentDiv: ElementRef
  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private moviesService: MoviesService,
              private renderer: Renderer2) {}

  ngOnInit() {
    console.log(this.timeOut)
  this.renderer.listen('window', 'resize', (evt) => {
    if (this.timeOut != null){
      //console.log(this.timeOut)
       clearTimeout(this.timeOut);
     }
  this.timeOut = setTimeout(()=>{
  //  console.log(this.timeOut)
      // this.setHeight(this.parentDiv)
     }, 100)

  })
    this.activatedRoute.params
    .flatMap((params:Params, index:number)=>{
      this.pageNum = params['pageNum']
      //console.log(this.pageNum)
      return this.moviesService.getMovie('showAll', params['pageNum'])
    })

    .subscribe((data)=>{
        if(data){
          this.config = JSON.parse(localStorage.getItem('configuration'));
          this.items = data;

          setTimeout(()=>{
            this.isActive = 'active';
            this.loading = false;
            //  console.log(this.parentDiv.nativeElement.children[0].offsetHeight);

          }, 800)
        }
    },err => {
        this.loading = false;
        console.log(err)
      }
    )


  }

ngAfterViewInit(){
  setTimeout(()=>{
    //this.setHeight(this.parentDiv)
  },1800)
}
public setHeight(el){
  //console.log(this.parentDiv.nativeElement.children.offsetHeight);
  this.divHeights = []
  let maxHeight:number;
  console.log(el.nativeElement.children[0])
  let divChildren = el.nativeElement.children
    for (let i = 0; i < divChildren.length; i++){
      let divHeights = divChildren[i].clientHeight
      this.divHeights.push(divHeights);
        //console.log(this.divHeights);
    }
    maxHeight = Math.max( ...this.divHeights )


    for (let i = 0; i < divChildren.length; i++){
    this.renderer.setStyle(divChildren[i], 'min-height', maxHeight+"px")
    }
}




  public nextPage(){
    this.pageNum++;
    this.router.navigate(['/movies', this.pageNum]);
  }

  public prevPage(){
    this.pageNum--;
  }


}
