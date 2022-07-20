// import { IsEmail, IsNotEmpty } from 'class-validator';
export class UserDTO {
  id: string;

  // @IsEmail()
  // @IsNotEmpty()
  email: string;

  // @IsNotEmpty()
  password: string;
}
