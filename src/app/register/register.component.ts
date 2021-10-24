import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { User } from '../core/models/user.model';
import { AuthService } from '../core/services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { passwordValidator } from '../core/functions/passwordValidator';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @ViewChild('modalRegister') modalRegister?: ElementRef;
  registerForm: FormGroup;
  validationMessages = {
    firstName: [{ type: 'required', message: 'El nombre es requerido.' }],
    lastName: [{ type: 'required', message: 'Los apellidos son requeridos.' }],
    email: [
      { type: 'required', message: 'El email es requerido.' },
      { type: 'pattern', message: 'El email no es válido.' },
    ],
    password: [
      { type: 'required', message: 'La contraseña es requerida.' },
      {
        type: 'minlength',
        message: 'La contraseña debe tener un minino de 6 caracteres.',
      },
    ],
    confirmPassword: [
      { type: 'required', message: 'La contraseña es requerida.' },
      {
        type: 'minlength',
        message: 'La confirmación de la contraseña debe tener un minino de 6 caracteres.',
      },
    ],
  };
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private ngbModal: NgbModal,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group(
      {
        firstName: new FormControl(
          '',
          Validators.compose([Validators.required])
        ),
        lastName: new FormControl(
          '',
          Validators.compose([Validators.required])
        ),
        email: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            Validators.pattern(
              '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'
            ),
          ])
        ),
        password: new FormControl(
          '',
          Validators.compose([Validators.required, Validators.minLength(6)])
        ),
        confirmPassword: new FormControl(
          '',
          Validators.compose([Validators.required, Validators.minLength(6)])
        ),
      },
      { validator: passwordValidator() }
    );
  }
  ngOnInit(): void {}
  handleSubmit(userToRegister: User): void {
    this.authService.signUp(userToRegister).subscribe(
      (data) => {
        if (data.data != undefined) {
          this.ngbModal.open(this.modalRegister).result.then((res) => {
            this.router.navigate(['/login']);
          });
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
