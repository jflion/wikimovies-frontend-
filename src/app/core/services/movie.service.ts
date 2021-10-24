import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movie } from '../models/movie.model';

const httpOption = {
  headers: new HttpHeaders({
    'Contend-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private httpClient: HttpClient) {}
  getAllMovies(): Observable<any> {
    return this.httpClient.get(
      `${environment.API_WIKIMOVIES}${environment.API_MOVIE.PATH_MOVIE}${environment.API_MOVIE.ENDPOINT_GETALLMOVIES}`
    );
  }
  getMovieById(idMovie: string): Observable<any> {
    return this.httpClient.get(
      `${environment.API_WIKIMOVIES}${environment.API_MOVIE.PATH_MOVIE}${environment.API_MOVIE.ENDPOINT_GETMOVIEBYID}/${idMovie}`
    );
  }

  addMovie(movie: Movie): Observable<any>{
    return this.httpClient.post(`${environment.API_WIKIMOVIES}${environment.API_MOVIE.PATH_MOVIE}${environment.API_MOVIE.ENDPOINT_ADDMOVIE}`, movie, httpOption);
  }

  updateMovie(idMovie: string,movie: Movie): Observable<any>{
    return this.httpClient.put(`${environment.API_WIKIMOVIES}${environment.API_MOVIE.PATH_MOVIE}${environment.API_MOVIE.ENDPOINT_UPDATEMOVIE}/${idMovie}`, movie, httpOption);
  }
}
