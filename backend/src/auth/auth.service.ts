// auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) { }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async login(users: any) {
      const user = await this.userService.findByEmail(users.email);
      if (!user) {
        throw new Error('Invalid credentials');
      }
      const payload = {
        username: user.email,
        sub: user.id,
        authorId: user.id,
      };
      const jwtToken = this.jwtService.sign(payload, {
        secret: String(process.env['JWT_SECRET']),
      });
      return { jwtToken,user };
  }


  async register(data: any) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.userService.create({
      password: hashedPassword,
      email: data.email,
      name: data.name,
    });

    const payload = {
      username: user.email,
      sub: user.id,
      authorId: user.id,
    };

    const jwtToken = this.jwtService.sign(payload, {
      secret: String(process.env['JWT_SECRET']),
    });
    user.password = '';
    return { jwtToken, user };
  }
  // async register(data: any) {
  //   const hashedPassword = await bcrypt.hash(data.password, 10);
  //   return this.userService.create({ ...data, password: hashedPassword });
  // }
}
