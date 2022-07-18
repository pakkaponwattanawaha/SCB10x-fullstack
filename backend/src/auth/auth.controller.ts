import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UserDTO } from 'src/user/dto/user.dto';

import { UserDetails } from 'src/user/user-details.interface';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  //basically a caller of injected dependency-> Auth Service -> then is used to call injected function like login()
  constructor(private authService: AuthService) {}
  //POST auth/signup
  @Post('register')
  register(@Body() user: UserDTO): Promise<UserDetails | null> {
    console.log(user);
    return this.authService.register(user);
  }

  //POST auth/login
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() user: UserDTO): Promise<{ token: string } | null> {
    console.log(user);
    return this.authService.login(user);
  }

  @Post('verify-token')
  @HttpCode(HttpStatus.OK)
  verifyJwt(@Body() payload: { token: string }) {
    return this.authService.verifyJwt(payload.token);
  }
}
