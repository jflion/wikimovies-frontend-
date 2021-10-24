import { Component, OnInit } from '@angular/core';
import { TokenstorageService } from '../core/services/tokenstorage.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  currentUser: any;
  isAuthenticated: boolean = false;
  email: string = '';
  constructor(private tokenstorageService: TokenstorageService) {}
  ngOnInit(): void {
    this.currentUser = this.tokenstorageService.getCurrentUser();
    if (this.currentUser) {
      this.isAuthenticated = true;
      this.email = this.currentUser.email;
    }
  }
  title = 'Wiki Movies';
  logout(): void {
    this.tokenstorageService.clearStorage();
    window.location.reload();
  }
}
