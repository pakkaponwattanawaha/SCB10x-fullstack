import { Injectable, HttpStatus, HttpException } from '@nestjs/common';

import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

import { JwtService } from '@nestjs/jwt';
import { UserService } from './../user/user.service';
import { UserDetails } from 'src/user/user-details.interface';
import { UserDTO } from 'src/user/dto/user.dto';
import { UserDocument } from 'src/user/user.schema';

@Injectable({})
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    const scryptAsync = promisify(scrypt);
    const salt = randomBytes(8).toString('hex');
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;
    return `${buf.toString('hex')}.${salt}`;
  }

  async doesPasswordMatch(
    password: string,
    storedPassword: string,
  ): Promise<boolean> {
    const scryptAsync = promisify(scrypt);
    const [hashedPassword, salt] = storedPassword.split('.');
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;
    console.log(buf.toString('hex'), hashedPassword);
    return buf.toString('hex') === hashedPassword;
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserDetails | null> {
    const user = await this.userService.findByEmail(email);
    const doesUserExist = !!user;

    if (!doesUserExist) return null;

    const doesPasswordMatch = await this.doesPasswordMatch(
      password,
      user.password,
    );

    if (!doesPasswordMatch) return null;

    return this.userService._getUserDetails(user);
  }

  async register(user: Readonly<UserDTO>): Promise<UserDetails | any> {
    const { email, password } = user;

    const existingUser = await this.userService.findByEmail(email);
    console.log(existingUser);
    if (existingUser)
      throw new HttpException(
        'An account with that email already exists!',
        HttpStatus.CONFLICT,
      );
    console.log(password);
    const hashedPassword = await this.hashPassword(password);

    const newUser = await this.userService.create(email, hashedPassword);
    return this.userService._getUserDetails(newUser);
  }

  async login(
    existingUser: UserDTO,
  ): Promise<{ token: string; id: string; email: string } | null> {
    const { email, password } = existingUser;
    const user = await this.validateUser(email, password);

    if (!user)
      throw new HttpException('Invalid Credentials!!', HttpStatus.UNAUTHORIZED);

    const jwt = await this.jwtService.signAsync({ user });
    return { token: jwt, id: user.id, email: email };
  }

  async verifyJwt(jwt: string): Promise<{ verified: boolean; exp: number }> {
    try {
      const { exp } = await this.jwtService.verifyAsync(jwt);
      return { verified: true, exp };
    } catch (error) {
      throw new HttpException('Invalid JWT', HttpStatus.UNAUTHORIZED);
    }
  }
}
