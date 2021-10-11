import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { LoginInt, LoginResponseInt } from '../interfaces/login.interface';
import Swal from 'sweetalert2';
/* Angular JWT */
import { JwtHelperService } from '@auth0/angular-jwt';
const jwtHelper = new JwtHelperService();
/* Angular JWT */
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private user$ = new BehaviorSubject<any>(null);
  //Metodos Get del observable.
  //Metodo get para el header.
  get getUserLogin(): Observable<LoginResponseInt> {
    return this.user$.asObservable();
  }
  //Metodo get para la consulta en permisos
  get getUserValue(): LoginResponseInt {
    return this.user$.getValue();
  }
  //Comienzo
  constructor(private http: HttpClient, private router: Router) {
    this.checkToken();
  }

  //Observable login que recibe data y guarda token en local storage.
  logIn(data: LoginInt): Observable<LoginResponseInt> {
    return this.http
      .post<LoginResponseInt>(`${environment.urlAPI}?login`, data)
      .pipe(
        /* Cachamos la resuesta del backend, guardamos el usuario en el observer
        guardamos el token en el local storage
        Asignamos el valor de los obserbles isLogin -- isAdmin */
        tap((resp) => {
          //Todo OK
          if (resp.msg === 'OK') {
            this.saveLocalStorage(resp);
            this.user$.next(resp);
          } else if (resp.msg === 'error') {
            //En caso de ser incorrecto mandamos llamar el metodo que gestiona los errores.
            this.handlerError(resp.reason);
          }
        })
      );
  }

  // Metodo que borra el local storage y limpia el observable user.
  logOut(): void {
    localStorage.clear();
    this.user$.next(null);
    this.router.navigate(['/login']);
  }

  //Metodo que revisa la existencia y vigencia del token.
  private checkToken(): void {
    //Recuperamos el user completo
    const local: any = localStorage.getItem('user');
    //Lo parseamos
    const user: any = JSON.parse(local);
    //Verificamos si existe el user y si no esta expirado.
    //Si falla alguna, mandamos un logout
    if (user != null) {
      const isExpired: boolean = jwtHelper.isTokenExpired(user.token);
      //Si no esta expirado, seteamos el user
      if (!isExpired) {
        this.user$.next(user);
      } else this.logOut();
    } else this.logOut();
  }

  private saveLocalStorage(user: LoginResponseInt): void {
    //El id y msg los almacenamos en independientes y el resto lo dejamos el rest, que es lo que nos interesaa guardar
    const { id, msg, ...rest } = user;
    localStorage.setItem('user', JSON.stringify(rest));
  }
  /* Metodo para el manejo de los errores, si es un error especifico lo setea, sino manda uno general. */
  handlerError(reason: any): void {
    let errorMsg = 'An error occured retrienvieng data. Msg Default.';
    if (reason) {
      errorMsg = `Error description: ${reason}`;
    }
    Swal.fire({
      icon: 'error',
      title: 'Error.',
      text: errorMsg,
    });
  }
}
