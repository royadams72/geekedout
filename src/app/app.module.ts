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
import { ComicdetailsComponent } from './components/comicdetails/comicdetails.component';

import { MoviesComponent } from './components/movies/movies.component';
import { MoviespreviewComponent } from './components/moviespreview/moviespreview.component';
import { MoviedetailsComponent } from './components/moviedetails/moviedetails.component';

import { GamesComponent } from './components/games/games.component';
import { GamespreviewComponent } from './components/gamespreview/gamespreview.component';
import { GamesdetailsComponent } from './components/gamesdetails/gamesdetails.component';

import { MusicdetailsComponent } from './components/musicdetails/musicdetails.component';
import { MusicComponent } from './components/music/music.component';
import { MusicpreviewComponent } from './components/musicpreview/musicpreview.component';
//Services
import { MusicService } from './services/music.service';
import { GamesService } from './services/games.service';
import { MoviesService } from './services/movies.service';
import { ComicsService } from './services/comics.service';
import { ElapsedTimeService } from './services/elapsed-time.service';
import { SearchService } from './services/search.service';

import { LoadingComponent } from './components/loading/loading.component';
import { NavComponent } from './components/nav/nav.component';
import { SearchComponent } from './components/search/search.component';


//Third party - utils
import { TruncatePipe2 } from './utils/truncate.pipe';
import { LazyLoadImageModule } from 'ng-lazyload-image';


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
    TruncatePipe2,
    LoadingComponent,
    NavComponent,
    SearchComponent,
    ComicdetailsComponent,
    MoviedetailsComponent,
    MusicdetailsComponent,
    GamesdetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    routing,
    LazyLoadImageModule

  ],
  providers: [
     ComicsService,
     MoviesService,
     GamesService,
     MusicService,
     ElapsedTimeService,
     SearchService
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
