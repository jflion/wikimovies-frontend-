import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';
import { TokenstorageService } from '../core/services/tokenstorage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  serviceLoad: boolean = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private tokenstorageService: TokenstorageService
  ) {}
  errorMessage?: string;
  form: any = {
    email: 'admin@newhorizons.edu.pe',
    password: 'NewHorizons2021',
  };

  handleSubmit(): void {
    const { email, password } = this.form;
    this.serviceLoad = true;
    this.authService.signIn(email, password).subscribe(
      (data) => {
        if (data.data != undefined) {
          this.tokenstorageService.saveToken(data.data.token);
          this.tokenstorageService.saveUser(data.data);
          this.serviceLoad = true;
          window.location.reload();
        }
      },
      (error) => {
        if (error.status === 404) {
          this.errorMessage = 'Usuario y/o contraseña incorrecto.';
          this.serviceLoad = false;
        }
      }
    );
  }

  ngOnInit(): void {}
}
