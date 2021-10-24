import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Movie } from '../core/models/movie.model';
import { MovieService } from '../core/services/movie.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  movie?: Movie;
  constructor(
    private router: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.router.params.subscribe((params: Params) => {
      const idMovie = params.idMovie;
      this.movieService.getMovieById(idMovie).subscribe(
        (data) => {
          this.movie = data.data;
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }
}
