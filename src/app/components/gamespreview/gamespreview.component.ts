import { Component, OnInit } from '@angular/core';
import { GamesService } from '../../services/games.service';
@Component({
  selector: 'app-gamespreview',
  templateUrl: './gamespreview.component.html',
  styleUrls: ['./gamespreview.component.css']
})
export class GamespreviewComponent implements OnInit {
  public catTitle = 'Loading Games content';
  public loading: boolean = true;
  private items:Array<any> = [];
    constructor(private gamesService: GamesService) { }

    ngOnInit(){
      this.gamesService.getPreview().subscribe((data)=>{
        this.items = data;
        this.loading = false;
        console.log(data)
      },err => {
        this.loading = false;
        console.log(err)
      })
    }
}
