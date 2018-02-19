import {ModuleWithProviders} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {MoviesComponent, MoviedetailsComponent} from './components/movies/';
import {ComicsComponent, ComicdetailsComponent} from './components/comics/';
import { GamesComponent, GamesdetailsComponent } from './components/games/';
import {MusicComponent, MusicdetailsComponent} from './components/music/';
import {SearchComponent} from './components/search/search.component';
import {HomeComponent} from './components/home/home.component';

const appRoutes: Routes = [
   {path: "movies", component: MoviesComponent},
   {path: "movie-details", component: MoviedetailsComponent},
   // {path: "movie-details/:id/:searchStr", component: MoviedetailsComponent},
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
   // {path: "search/:searchStr", component: SearchComponent},
   {path: "", component: HomeComponent},
   {path: "**", component: HomeComponent},
]

export const routing:ModuleWithProviders = RouterModule.forRoot(appRoutes);
