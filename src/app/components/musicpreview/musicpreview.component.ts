import { Component, OnInit } from '@angular/core';
import { MusicService } from '../../services/music.service';
@Component({
  selector: 'app-musicpreview',
  templateUrl: './musicpreview.component.html',
  styleUrls: ['./musicpreview.component.css']
})
export class MusicpreviewComponent implements OnInit {
  public catTitle = 'Loading Music content';
  public loading: boolean = true;
  public items:Array<any> = [];
    constructor(private musicService: MusicService) { }

    ngOnInit(){
      this.musicService.getPreview().subscribe((data)=>{
        if(data){
          this.items = data;
          this.loading = false;
        }

        console.log(data)
      },err => {
        this.loading = false;
        console.log(err)
      })
    }

}
