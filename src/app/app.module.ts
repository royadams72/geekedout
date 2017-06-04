import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ComicsComponent } from './components/comics/comics.component';
import { ComicspreviewComponent } from './components/comicspreview/comicspreview.component';
import { MoviesComponent } from './components/movies/movies.component';
import { MoviespreviewComponent } from './components/moviespreview/moviespreview.component';
import { GamesComponent } from './components/games/games.component';
import { GamespreviewComponent } from './components/gamespreview/gamespreview.component';
import { MusicComponent } from './components/music/music.component';
import { MusicpreviewComponent } from './components/musicpreview/musicpreview.component';
import { MusicService } from './services/music.service';
import { GamesService } from './services/games.service';
import { MoviesService } from './services/movies.service';
import { ComicsService } from './services/comics.service';

import {ImageSizeDirective} from "./utils/getImageSize";
import {CapitalizePipe} from "./utils/pipes/capitalise.pipe";
//Third party
import { TruncatePipe } from 'angular2-truncate';
import { LoadingComponent } from './components/loading/loading.component';
import { NavComponent } from './components/nav/nav.component';
import { SearchComponent } from './components/search/search.component';
import { ComicdetailsComponent } from './components/comicdetails/comicdetails.component';
import { MoviedetailsComponent } from './components/moviedetails/moviedetails.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ComicsComponent,
    ComicspreviewComponent,
    MoviesComponent,
    MoviespreviewComponent,
    GamesComponent,
    GamespreviewComponent,
    MusicComponent,
    MusicpreviewComponent,
    TruncatePipe,
    LoadingComponent,
    NavComponent,
    SearchComponent,
    ComicdetailsComponent,
    CapitalizePipe,
    MoviedetailsComponent,
    ImageSizeDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    routing
  ],
  providers: [ ComicsService, MoviesService, GamesService, MusicService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
