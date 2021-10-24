import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenstorageService } from 'src/app/core/services/tokenstorage.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private tokenstorageService: TokenstorageService) {}
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let newRequest = request;
    const currentToken = this.tokenstorageService.getToken();

    if (currentToken != null) {
      newRequest = request.clone({
        headers: request.headers.set(
          environment.API_AUTH.HEADER_KEY,
          `${environment.API_AUTH.JWT_BEARER} ${currentToken}`
        ),
      });
    }
    return next.handle(newRequest);
  }
}

export const JwtInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true,
  },
];
