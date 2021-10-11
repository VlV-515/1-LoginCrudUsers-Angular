export interface LoginInt {
  username: string;
  password: string;
}
export interface LoginResponseInt {
  msg: string;
  id: number;
  role: string;
  token: string;
  reason?: string;
}
