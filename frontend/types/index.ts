export interface LoginFormDataType {
  email: string;
  password: string;
}

export interface RegisterFormDataType {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface UserDetails {
  id?: string;
  email: string;
}

export class CreateFormDataType {
  name: string;
  description?: string;
  limit: number;
}

export class PartyDetails {
  id?: string;
  name: string;
  description?: string;
  owner: UserDetails;
  limit: number;
  members?: Array<UserDetails>;
}
