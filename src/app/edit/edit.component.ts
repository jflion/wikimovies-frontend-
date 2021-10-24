import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { rangeValidator } from '../core/functions/rangeValidator';
import { Movie } from '../core/models/movie.model';
import { MovieService } from '../core/services/movie.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  @ViewChild('modalRegister') modalRegister?: ElementRef;
  idPelicula: string = "";
  movie?: Movie;
  editForm: FormGroup;
  validationMessages = {
    title: [{ type: 'required', message: 'El título es requerido.' }],
    overview: [{ type: 'required', message: 'La descripción es requerida.' }],
    imageUrl: [
      { type: 'required', message: 'La ruta de imagen es requerida.' },
    ],
    popularity: [
      { type: 'required', message: 'La popularidad es requerida.' },
      {
        type: 'range',
        message: 'El rango de la popularidad debe estar entre 0 y 100.',
      },
    ],
    duration: [{ type: 'required', message: 'La duración es requerida.' }],
  };
  constructor(
    private router: ActivatedRoute,
    private movieService: MovieService,
    private formBuilder: FormBuilder,
    private ngbModal: NgbModal,
    private routerNav: Router
  ) {
    this.editForm = this.formBuilder.group({
      title: new FormControl('', Validators.compose([Validators.required])),
      overview: new FormControl('', Validators.compose([Validators.required])),
      imageUrl: new FormControl('', Validators.compose([Validators.required])),
      popularity: new FormControl(
        0,
        Validators.compose([Validators.required, rangeValidator(0, 100)])
      ),
      duration: new FormControl('', Validators.compose([Validators.required])),
    });
  }

  ngOnInit(): void {
    this.router.params.subscribe((params: Params) => {
      this.idPelicula = params.idMovie;
      this.movieService.getMovieById(this.idPelicula).subscribe(
        (data) => {
          this.movie = data.data;
          this.editForm.controls.title.setValue(this.movie?.title)
          this.editForm.controls.overview.setValue(this.movie?.overview)
          this.editForm.controls.imageUrl.setValue(this.movie?.imageUrl)
          this.editForm.controls.popularity.setValue(this.movie?.popularity)
          this.editForm.controls.duration.setValue(this.movie?.duration)
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }

  handleSubmit(movieToregister: Movie): void {
    this.movieService.updateMovie(this.idPelicula,movieToregister).subscribe(
      (data) => {
        if (data.data != undefined) {
          this.ngbModal.open(this.modalRegister).result.then((res) => {
            this.routerNav.navigate(['/home']);
          });
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
