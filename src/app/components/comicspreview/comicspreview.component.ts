import { Component, OnInit } from '@angular/core';
import { ComicsService } from '../../services/comics.service';
import { TruncatePipe } from 'angular2-truncate';
@Component({
  selector: 'app-comicspreview',
  templateUrl: './comicspreview.component.html',
  styleUrls: ['./comicspreview.component.css']
})
export class ComicspreviewComponent implements OnInit {
public items:Array<any> = [];
public loading: boolean = true;
public catTitle = 'Loading Comics content';
  constructor(private comicsService: ComicsService) { }

  ngOnInit(){
    this.comicsService.getPreview().subscribe((data)=>{
      this.items = data;
      this.loading = false;
      console.log(data)
    },err => {
      this.loading = false;
      console.log(err)
    })
  }

}
