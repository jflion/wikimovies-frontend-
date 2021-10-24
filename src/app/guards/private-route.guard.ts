import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { TokenstorageService } from '../core/services/tokenstorage.service';

@Injectable({
  providedIn: 'root',
})
export class PrivateRouteGuard implements CanActivate {
  constructor(
    private tokenstorageService: TokenstorageService,
    private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    var currentUser = this.tokenstorageService.getCurrentUser();
    if (!currentUser) {
      this.router.navigate(['/login']);
    }
    return true;
  }
}
