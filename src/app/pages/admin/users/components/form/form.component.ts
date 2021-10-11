import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserInt } from '../../interfaces/user.interface';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {
  formUser!: FormGroup;
  private regexEmail = /\S+@\S+\.\S+/;
  @Input() titleForm!: string;
  @Input() userData!: UserInt | undefined;
  @Output() dataForm = new EventEmitter<UserInt>();
  constructor(
    public formBuilder: FormBuilder,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    //Si existe entonces es un edit.
    if (this.userData) {
      //Formamos el formUser para Edit.
      this.formUser = this.formBuilder.group({
        username: [
          this.userData.username,
          [Validators.required, Validators.pattern(this.regexEmail)],
        ],
        password: [
          this.userData.password,
          [Validators.required, Validators.minLength(5)],
        ],
        role: [this.userData.role, [Validators.required]],
      });
    } else {
      //Formamos el formUser para new User.
      this.formUser = this.formBuilder.group({
        username: [
          '',
          [Validators.required, Validators.pattern(this.regexEmail)],
        ],
        password: ['', [Validators.required, Validators.minLength(5)]],
        role: ['', [Validators.required]],
      });
    }
  }
  saveChanges(form: UserInt): void {
    //Si existe, entonces es un edit, agregamos el id al form recibido y lo emitimos.
    if (this.userData) {
      const user: UserInt = {
        id: this.userData.id,
        username: form.username,
        password: form.password,
        role: form.role,
      };
      this.dataForm.emit(user);
      this.cleanAndCloseModal();
    } else {
      //Si no existe, entonces es usuario nuevo, manda el form como tal.
      this.dataForm.emit(form);
      this.cleanAndCloseModal();
    }
  }
  /*************************
   ***[Metodos Generales]***
   *************************/
  //Metodo que limpia y cierra el modal.
  cleanAndCloseModal(): void {
    this.formUser.setValue({
      username: [''],
      password: [''],
      role: [''],
    });
    this.titleForm = '';
    this.userData = undefined;
    this.modalService.dismissAll();
  }
}
