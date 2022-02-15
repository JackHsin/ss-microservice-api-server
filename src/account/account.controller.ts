import { Controller, Get, UseGuards, Param } from '@nestjs/common';
import { Roles } from '../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.gurad';
import { AccountService } from './account.service';
import { RoleTypeEnum } from './enum/account.enum';
import { RolesGuard } from './guard/roles.guard';

@Controller('account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @UseGuards(RolesGuard)
  @Roles(RoleTypeEnum.ADMIN)
  @UseGuards(JwtAuthGuard)
  @Get('profile/:username')
  getProfile(@Param('username') username: string) {
    return this.accountService.findOneByUsername(username);
  }
}
