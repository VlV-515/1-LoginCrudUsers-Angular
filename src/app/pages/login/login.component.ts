import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginResponseInt } from './interfaces/login.interface';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit, OnDestroy {
  //Variables necesarias
  formLogin!: FormGroup;
  private regexEmail = /\S+@\S+\.\S+/;
  private loginSubscription!: Subscription;
  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    //TODO: Data mockeada que despues se va a elminar
    //Formamos el formulario con sus validaciones necesarias.
    //Username: requerido y que concuerde con el patron regex
    //Password: requerido y que sea mayor de 5
    this.formLogin = this.formBuilder.group({
      username: [
        '',
        [Validators.required, Validators.pattern(this.regexEmail)],
      ],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }
  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.loginSubscription.unsubscribe();
  }

  //Metodo que manda llamar el metodo de login del LoginService, todo OK, lo redirecciona [/home].
  btnSubmit() {
    this.loginSubscription = this.loginService
      .logIn(this.formLogin.value)
      .subscribe((x: LoginResponseInt) => {
        if (x.msg === 'OK') this.router.navigate(['/home']);
      });
    //Limpia los campos
    this.formLogin.setValue({
      username: [''],
      password: [''],
    });
  }
  //Metodo que verifica si es valido el campo del formulario.
  //Si fue tocado, si fue algo escrito o si es invalido
  isValidField(field: string): boolean {
    let fieldForm = this.formLogin.get(field);
    return (fieldForm?.touched || fieldForm!.dirty) && !fieldForm?.valid;
  }
  //Metodo que retorna un msj personalizado si no es valido el campo del formulario.
  getErrorMsgValidation(field: string): string {
    let msgError!: string;
    let fieldForm = this.formLogin.get(field);
    //Si el error es porque esta vacio
    if (fieldForm?.errors!.required) {
      msgError = 'You must enter a value.';
      //Si el error es por un pattern (regex) entonces es caso email
    } else if (fieldForm?.hasError('pattern')) {
      msgError = 'No a valid email.';
      //Si el error es por un caso de tamaño menor al permitido, es caso password
    } else if (fieldForm?.hasError('minlength')) {
      msgError = 'This field must be longer than 5 characters.';
    }
    return msgError;
  }
}
