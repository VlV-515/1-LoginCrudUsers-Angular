import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './components/form/form.component';

@NgModule({
  declarations: [UsersComponent, FormComponent],
  imports: [CommonModule, UsersRoutingModule, FormsModule, ReactiveFormsModule],
  exports: [FormComponent],
})
export class UsersModule {}
