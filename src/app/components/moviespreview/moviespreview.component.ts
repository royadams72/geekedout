import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-moviespreview',
  templateUrl: './moviespreview.component.html',
  styleUrls: ['./moviespreview.component.css']
})
export class MoviespreviewComponent implements OnInit {
  public items:Array<any> = [];
  public config:any;
  public loading: boolean = true;
  public catTitle = 'Loading Cinema content';
  constructor(private moviesService: MoviesService) { }
  ngOnInit(){

    this.moviesService.getPreview().subscribe((data)=>{
      if(data){
       this.loading = false;
        //this.loadingSvc.setValue(false);
        this.config = JSON.parse(localStorage.getItem('configuration'));
        //  console.log(this.config)
          this.items = data
      }
      // console.log(data)
      },err => {
        this.loading = false;
        console.log(err)
      }
    )
  }

}
