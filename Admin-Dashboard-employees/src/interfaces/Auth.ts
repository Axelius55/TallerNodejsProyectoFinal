export interface LoginPayload {
  username: string;
  password: string;
}

export interface UserPayload {
  id: number;
  username: string;
  role: string;
}

export interface LoginResponse {
  token: string;
  user: UserPayload;
}
