import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private loginService: LoginService) {}
  canActivate(): Observable<boolean> {
    //Mandamos llamar el observable del service.
    return this.loginService.getUserLogin.pipe(
      //Tomamos el primer valor del observable lo cual contiene true o false
      take(1),
      //Retornamos el valor pero al contrario.
      //Si es true entonces no debe acceder, return false.
      //Si es false entonces debe loguearse, return true.
      map((user) => (user ? false : true))
    );
  }
}
