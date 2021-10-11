import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import {
  UserInt,
  ResUserInt,
  ErrorInt,
  newUserInt,
} from '../interfaces/user.interface';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  //Metodo que manda llamar todos los users
  getAllUsers(): Observable<UserInt[]> {
    return this.http.get<UserInt[]>(`${environment.urlAPI}?users`).pipe(
      tap((res) => {
        // Si res[0] es undefined, osea tiene error, se lo manda al metodo encargado.
        if (!res[0]) this.handlerError(res);
      })
    );
  }

  //Metodo que retorna un user en especifico.
  getUserById(idUser: number): Observable<UserInt> {
    return this.http
      .get<UserInt>(`${environment.urlAPI}?search=${idUser}`)
      .pipe(
        tap((res) => {
          // Si existe el msg, osea tiene error, se lo manda al metodo encargado.
          if (res.msg) this.handlerError(res);
        })
      );
  }

  //Metodo que agrega un nuevo user.
  addNewUser(data: newUserInt): Observable<ResUserInt> {
    return this.http
      .post<ResUserInt>(`${environment.urlAPI}?insert`, data)
      .pipe(
        tap((res) => {
          //Si la respuesta es un error, manda llamar al metodo.
          if (res.msg === 'error') this.handlerError(res);
        })
      );
  }

  //Metodo que actualiza un user.
  updateUser(data: UserInt): Observable<ResUserInt> {
    return this.http
      .post<ResUserInt>(`${environment.urlAPI}?update`, data)
      .pipe(
        tap((res) => {
          //Si la respuesta es un error, manda llamar al metodo.
          if (res.msg === 'error') this.handlerError(res);
        })
      );
  }

  //Metodo que elimina un user.
  deleteUser(idUser: number): Observable<ResUserInt> {
    return this.http
      .get<ResUserInt>(`${environment.urlAPI}?delete=${idUser}`)
      .pipe(
        tap((res) => {
          //Si la respuesta es un error, manda llamar al metodo.
          if (res.msg === 'error') this.handlerError(res);
        })
      );
  }

  //* Metodo para el manejo de los errores, si es un error especifico lo setea, sino manda uno general. */
  handlerError(error: any): void {
    let x: ErrorInt = error;
    let errorMsg = 'An error occured retrienvieng data. Msg Default.';
    if (x.reason) {
      errorMsg = `Error description: ${x.reason}`;
    }
    Swal.fire({
      icon: 'error',
      title: 'Error.',
      text: errorMsg,
    });
  }
  //Metodo que retorna
  checkToken(): Observable<ResUserInt> {
    return this.http.get<ResUserInt>(`${environment.urlAPI}?checkToken`).pipe(
      tap((res) => {
        //Si la respuesta es un error, manda llamar al metodo.
        if (res.msg === 'error') {
          this.handlerError(res);
        }
      })
    );
  }
}
