import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { newUserInt, ResUserInt, UserInt } from './interfaces/user.interface';
import { UserService } from './services/user.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnDestroy {
  subscriptionsArray: Subscription = new Subscription(); //Utilizado para adjuntar las subscripciones.
  users!: UserInt[]; //Guardara la respuesta del backend.
  userData!: UserInt | undefined; //Usado para guardar mientras se hace edit a un user.
  titleModal!: string; //Usado para obtener el title.
  constructor(
    private userService: UserService,
    private modalService: NgbModal,
    public formBuilder: FormBuilder
  ) {
    //Obtenemos toda la lista de users.
    this.refreshUsers();
  }
  ngOnDestroy(): void {
    //Lipieza de subscripciones.
    this.subscriptionsArray.unsubscribe;
  }

  /*************************
   *******[BTN ACTION]******
   *************************/
  //Btn que abre el modal New User
  btnNewUser(modal: any): void {
    //Asignamos valores y abrimos el modal.
    this.titleModal = `Add new user.`;
    this.userData = undefined;
    this.modalService.open(modal);
  }
  //Btn que abre el modal Edit User
  btnEditUser(user: UserInt, modal: any): void {
    //Asignamos valores y abrimos el modal.
    this.titleModal = `Edit User ${user.id}`;
    this.userData = user;
    this.modalService.open(modal);
  }
  //Btn que hace delete de un user.
  btnDeleteUser(idUser: number, lineNumber: any): void {
    //Le preguntamos si esta seguro, ejecutamos su desicion positiva.
    Swal.fire({
      icon: 'question',
      title: 'Are you sure to delete this user?',
      confirmButtonText: `Yes, delete`,
      confirmButtonColor: '#d9534f',
      showCancelButton: true,
      cancelButtonColor: '#292b2c',
    }).then((result) => {
      if (result.isConfirmed) {
        //Respuesta positiva.
        this.subscriptionsArray.add(
          this.userService.deleteUser(idUser).subscribe(() => {
            //Refrescamos elimnando el user de la tabla.
            this.users.splice(lineNumber, 1);
            //Confirmamos al usuario.
            this.showAlert('User delete. =)');
          })
        );
      }
    });
  }
  /*************************
   ********[ACTIONS]********
   *************************/
  //Metodo que hace un addUser o un editUser
  saveChanges(form: UserInt): void {
    //Si existe id entonces es un edit
    if (form.id) {
      this.editUser$(form);
    } else {
      this.newUser$(form);
    }
  }
  /********[ADD USER]*******/
  //Metodo que añade un nuevo user.
  private newUser$(form: newUserInt) {
    this.subscriptionsArray.add(
      this.userService.addNewUser(form).subscribe((x: ResUserInt) => {
        if (x.msg === 'insert') {
          //Si la respuesta es correcta mandamos una notificacion de insertado.
          //Refrescamos los usuarios, cerramos y limpiamos el modal.
          this.showAlert('User added. =)');
          this.refreshUsers();
        }
      })
    );
  }
  /*******[EDIT USER]*******/
  //Metodo que edita un user
  private editUser$(form: UserInt) {
    //Le preguntamos si esta seguro, ejecutamos su desicion positiva.
    Swal.fire({
      icon: 'question',
      title: 'Are you sure to update this user?',
      confirmButtonText: `Yes, update`,
      confirmButtonColor: '#d9534f',
      showCancelButton: true,
      cancelButtonColor: '#292b2c',
    }).then((result) => {
      if (result.isConfirmed) {
        //Respuesta positiva.
        this.subscriptionsArray.add(
          this.userService.updateUser(form).subscribe((resp: ResUserInt) => {
            if (resp.msg == 'update') {
              //Si la respuesta es correcta mandamos una notificacion de insertado.
              //Refrescamos los usuarios, cerramos y limpiamos el modal.
              this.showAlert('User updated. =)');
              this.refreshUsers();
            }
          })
        );
      }
    });
  }

  /*************************
   ***[Metodos Generales]***
   *************************/
  //Metodo que controla las alertas.
  private showAlert(msg: string): void {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: msg,
      showConfirmButton: false,
      timer: 1500,
    });
  }
  //Metodo para refrescar los users despues de cada cambio.
  private refreshUsers(): void {
    this.subscriptionsArray.add(
      this.userService.getAllUsers().subscribe((x) => (this.users = x))
    );
  }
}
