import { Injectable, OnModuleInit } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AccountService } from '../account/account.service';
import { JwtService } from '@nestjs/jwt';
import { AccountPO } from '../account/po/account.po';
import { CreateAccountInput } from '../account/dto/create-account.input';
import { SSHttpException } from '../common/exceptions/ss-http-exception';
import { TASK_EXCEPTION } from '../account/constants/exception.constant';

const { INVALID_PASSWORD } = TASK_EXCEPTION;

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    private accountService: AccountService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<Omit<AccountPO, 'password'>> {
    const account = await this.accountService.findOneByUsername(username);
    const isMatch = await bcrypt.compare(password, account.password);
    if (isMatch) {
      const { password, ...result } = account;
      return result;
    } else {
      throw new SSHttpException(INVALID_PASSWORD);
    }
  }

  async login(account: AccountPO) {
    const payload = {
      // username: account.username,
      sub: account.id,
      role: account.role,
    };
    return {
      accessToken: this.jwtService.sign(payload, { expiresIn: '2 days' }),
    };
  }

  async registerAccount(createAccountInput: CreateAccountInput) {
    const salt = await bcrypt.genSalt();

    createAccountInput.password = await bcrypt.hash(
      createAccountInput.password,
      salt,
    );

    const account = await this.accountService.registerAccount({
      ...createAccountInput,
      salt,
    });

    const payload = {
      // username: account.username,
      sub: account.id,
      role: account.role,
    };

    return {
      accessToken: this.jwtService.sign(payload, { expiresIn: '2 days' }),
    };
  }

  // Init Users
  async onModuleInit() {
    // try {
    //   await this.registerAccount({
    //     username: 'root',
    //     password: 'root0000',
    //     role: RoleTypeEnum.ADMIN,
    //   });
    //   await this.registerAccount({
    //     username: 'Head_Judge',
    //     password: 'CTSA_HJ001',
    //     role: RoleTypeEnum.HEAD_JUDGE,
    //   });
    //   await this.registerAccount({
    //     username: 'Priority_Judge',
    //     password: 'CTSA_PJ001',
    //     role: RoleTypeEnum.PRIORITY_JUDGE,
    //   });
    //   for (let i = 1; i < 6; i++) {
    //     await this.registerAccount({
    //       username: `Judge_${i}`,
    //       password: `CTSA_J001${i}`,
    //       role: RoleTypeEnum.JUDGE,
    //     });
    //   }
    // } catch (e) {}
  }
}
