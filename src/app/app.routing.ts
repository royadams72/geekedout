import {ModuleWithProviders} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";

import {MoviesComponent} from './components/movies/movies.component';
import {MoviedetailsComponent} from './components/moviedetails/moviedetails.component';
import {ComicsComponent} from './components/comics/comics.component';
import {ComicdetailsComponent} from './components/comicdetails/comicdetails.component';
import { GamesComponent, GamesdetailsComponent } from './components/games/';
import {MusicComponent} from './components/music/music.component';
import {MusicdetailsComponent} from './components/musicdetails/musicdetails.component';
import {SearchComponent} from './components/search/search.component';
import {HomeComponent} from './components/home/home.component';

const appRoutes: Routes = [
   {path: "movies", component: MoviesComponent},
   {path: "movie-details/:id", component: MoviedetailsComponent},
   {path: "movie-details/:id/:searchStr", component: MoviedetailsComponent},
   {path: "comics", component: ComicsComponent},
   {path: "comic-details/:id", component: ComicdetailsComponent},
   {path: "comic-details/:id/:searchStr", component: ComicdetailsComponent},
   {path: "music", component: MusicComponent},
   {path: "music-details/:id", component: MusicdetailsComponent},
   {path: "music-details/:id/:searchStr", component: MusicdetailsComponent},
   {path: "games", component: GamesComponent},
    {path: "games-details/:id", component: GamesdetailsComponent},
   {path: "games-details/:id/:searchStr", component: GamesdetailsComponent},
   {path: "search", component: SearchComponent},
   {path: "search/:searchStr", component: SearchComponent},
   {path: "", component: HomeComponent},
   {path: "**", component: HomeComponent},
]

export const routing:ModuleWithProviders = RouterModule.forRoot(appRoutes);
