import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { rangeValidator } from '../core/functions/rangeValidator';
import { Movie } from '../core/models/movie.model';
import { MovieService } from '../core/services/movie.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  @ViewChild('modalRegister') modalRegister?: ElementRef;
  movie?: Movie;
  createForm: FormGroup;
  validationMessages = {
    title: [{ type: 'required', message: 'Es títuli es requerido.' }],
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
    private movieService: MovieService,
    private formBuilder: FormBuilder,
    private ngbModal: NgbModal,
    private routerNav: Router
  ) {
    this.createForm = this.formBuilder.group({
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
  }

  handleSubmit(movieToregister: Movie): void {
    this.movieService.addMovie(movieToregister).subscribe(
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
