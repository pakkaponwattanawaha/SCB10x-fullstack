import { UserService } from './user.service';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserDetails } from './user-details.interface';
import { UserDocument } from './user.schema';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  // @UseGuards(JwtGuard)
  @Get(':id')
  getUserById(@Param('id') id: string): Promise<UserDetails | null> {
    return this.userService.findUserDetailsById(id);
  }

  @UseGuards(JwtGuard)
  @Get('email/:email')
  getUserByEmail(@Param('email') email: string): Promise<UserDetails | null> {
    return this.userService.findUserDetailsByEmail(email);
  }
}
