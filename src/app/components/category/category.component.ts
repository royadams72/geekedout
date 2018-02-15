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
  public catTitle = 'Loading Games content';
  public loading: boolean = true;
  public items: Array<any> = [];
  public isActive: string = 'inActive';
  public playTitle: string = 'faded';
  public showloader: string = 'opaque';
  constructor(private gamesService: GamesService,
    private activatedRoute: ActivatedRoute) { }
  ngOnInit() {
    this.activatedRoute.params
      .flatMap((params: Params) => {
        console.log(params)
        return this.gamesService.getItems(50)
      })
      .subscribe((data) => {
        if (data) {
          //  console.log(data)

          this.items = data;
          this.items = this.items.map(data => {
            // console.log(data.cover)
            if (data.cover != undefined) {
              data.cover.cloudinary_id = 'https://images.igdb.com/igdb/image/upload/t_cover_big/' + data.cover.cloudinary_id + '.jpg'

            } else {
              data.cover = { cloudinary_id: "/assets/image404@2x.png" }
            }
            return data;
          })
        }
        setTimeout(() => {
          this.isActive = 'active';
          this.loading = false;
          this.playTitle = 'opaque';
          this.showloader = 'faded';
        }, 300)

        //  console.log(data)
      }, err => {
        this.loading = false;
        console.log(err)
      })
  }

}
