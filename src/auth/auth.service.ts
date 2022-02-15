import { Injectable, OnModuleInit } from '@nestjs/common';
import { RoleTypeEnum } from '../account/enum/account.enum';
import { AccountService } from '../account/account.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    private accountService: AccountService,
    private jwtService: JwtService,
  ) {}

  async onModuleInit() {
    await this.accountService.create({
      id: 1,
      username: 'admin',
      password: 'admin',
      role: RoleTypeEnum.ADMIN,
    });
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const account = await this.accountService.findOneByUsername(username);
    if (account && account.password === pass) {
      const { password, ...result } = account;
      return result;
    }
    return null;
  }

  async login(account: any) {
    const payload = {
      // username: account.username,
      sub: account.id,
      role: account.role,
    };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
