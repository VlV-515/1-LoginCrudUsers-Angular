import { ChildrenOutletContexts } from '@angular/router';

export interface UserInt {
  id: number;
  username: string;
  password: string;
  role: string;
  createDate?: string;
  msg?: string;
  reason?: string;
}
export interface newUserInt {
  username: string;
  password: string;
  role: string;
}

export interface ResUserInt {
  msg: string;
  reason?: string;
}

export interface ErrorInt {
  msg: string;
  reason: string;
}
