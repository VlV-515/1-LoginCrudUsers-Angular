import { LoginResponseInt } from '../../../pages/login/interfaces/login.interface';
import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from 'src/app/pages/login/services/login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(private loginService: LoginService, private router: Router) {}
  //Variables necesarias
  private userSubscription!: Subscription;
  isLogin: boolean = false;
  isAdmin: boolean = false;
  userName: string = '';

  ngOnInit(): void {
    //Recuperamos el user.
    this.userSubscription = this.loginService.getUserLogin.subscribe(
      (user: LoginResponseInt) => {
        //Si existe, seteamos true isLogin y userName, de lo contrario false.
        if (user) {
          this.isLogin = true;
          this.userName = user.role;
          //Consultamos si es un admin y seteamos isAdmin.
          if (user.role === 'admin') {
            this.isAdmin = true;
          } else {
            this.isAdmin = false;
          }
        } else {
          this.isLogin = false;
          this.isAdmin = false;
          this.userName = '';
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
  btnLogout(): void {
    this.loginService.logOut();
  }
}
