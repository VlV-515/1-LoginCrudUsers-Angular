import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  constructor(public loginService: LoginService) {}

  ngOnInit(): void {}
}
