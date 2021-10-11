import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../../login/services/login.service';
import { UserService } from '../users/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private loginService: LoginService,
    private userService: UserService,
    private router: Router
  ) {}
  canActivate(): any {
    //Recuperamos el valor del rol.
    const user = this.loginService.getUserValue.role;
    //Creamos la promesa del token.
    const promiseTkn = new Promise((resolve, reject) => {
      this.userService.checkToken().subscribe((resp) => {
        if (resp.msg === 'OK') {
          //Todo bien, retorna true.
          resolve(true);
        } else {
          //Todo mal, quiere decir que llego hasta aca modificando local storage.
          reject(this.loginService.logOut());
        }
      });
    });

    //Verificamos que sea admin, si lo es, verifica que sea uno valido por la promesa.
    if (user === 'admin') {
      //Retornamos lo que la promesa conteste.
      return promiseTkn.then((res) => res).catch((err) => err);
    } else {
      //Si no es admin, lo regresa a home.
      this.router.navigate(['/home']);
      return false;
    }
  }
}
