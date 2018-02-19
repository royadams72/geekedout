import { Component, OnInit } from '@angular/core';
import { GamesService } from '../../../services/games.service';
import { ActiveTrigger, TitleAnim, LoaderAnim } from '../../../animations/preview';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs';
@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css'],
  animations: [ActiveTrigger, TitleAnim, LoaderAnim]
})
export class GamesComponent implements OnInit {
  public loading: boolean = true;
  public items: Array<any> = [];
  public loadingMsg: string = "Loading Games";
  public catTitle:string = "Latest Games";
  public link:string = "/games-details"
  public colClass: string = "col-md-2 col-6";
  constructor(private gamesService: GamesService,
    private activatedRoute: ActivatedRoute) { }
  ngOnInit() {
    this.activatedRoute.url
      .flatMap((data) => {
        // this.activatedRoute.url.subscribe((data)=>console.log(data))
        console.log(data[0].path)
        return this.gamesService.getItems(50)
      })
      .subscribe((data) => {
        if (data) {
          //  console.log(data)

          this.items = data;
          this.items = this.items.map(data => {
          data.link = this.link;
            if (data.cover != undefined) {
              data.img = 'https://images.igdb.com/igdb/image/upload/t_cover_big/' + data.cover.cloudinary_id + '.jpg'

            } else {
              data.img = "/assets/image404@2x.png";
            }
            return data;
          })
        }


        //  console.log(data)
      }, err => {
        this.loading = false;
        console.log(err)
      })
  }

}
