import {ModuleWithProviders} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";

import {MoviesComponent} from './components/movies/movies.component';
import {MoviedetailsComponent} from './components/moviedetails/moviedetails.component';
import {ComicsComponent} from './components/comics/comics.component';
import {ComicdetailsComponent} from './components/comicdetails/comicdetails.component';
import {GamesComponent} from './components/games/games.component';
import {MusicComponent} from './components/music/music.component';
import {SearchComponent} from './components/search/search.component';
import {HomeComponent} from './components/home/home.component';

const appRoutes: Routes = [
  {path: "movies/:pageNum", component: MoviesComponent},
   {path: "movies", component: MoviesComponent},
   {path: "movie-details/:id", component: MoviedetailsComponent},
   {path: "comic-details/:id", component: ComicdetailsComponent},
   {path: "comics", component: ComicsComponent},
   {path: "music", component: MusicComponent},
   {path: "games", component: GamesComponent},
   {path: "search", component: SearchComponent},
   {path: "", component: HomeComponent},
   {path: "**", component: HomeComponent},
]

export const routing:ModuleWithProviders = RouterModule.forRoot(appRoutes);
