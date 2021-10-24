import { Component, OnInit } from '@angular/core';
import { Movie } from '../core/models/movie.model';
import { MovieService } from '../core/services/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  movies?: Movie[];
  constructor(private movieService: MovieService) {}
  ngOnInit(): void {
    this.movieService.getAllMovies().subscribe(
      (data) => {
        this.movies = data.data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
