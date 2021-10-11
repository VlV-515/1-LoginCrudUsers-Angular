import { LoginService } from '../../pages/login/services/login.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AdminInterceptor implements HttpInterceptor {
  constructor(private loginService: LoginService) {}
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    //Verifica que la peticion provenga de donde requiera setear el header.
    if (
      request.url.includes('users') ||
      request.url.includes('delete') ||
      request.url.includes('update') ||
      request.url.includes('insert') ||
      request.url.includes('checkToken')
    ) {
      //Recuperamos el token y el role.
      const token = this.loginService.getUserValue.token;
      const role = this.loginService.getUserValue.role;
      //Clonamos el request y le añadimos el header.
      const req = request.clone({
        setHeaders: {
          token,
          role,
        },
      });
      return next.handle(req);
    }
    //Si no, mandamos la solicitud tal cual.
    return next.handle(request);
  }
}
