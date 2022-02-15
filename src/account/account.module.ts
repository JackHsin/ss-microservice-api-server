import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountResolver } from './account.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountRepository } from './repositories/account.repository';
import { AccountController } from './account.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AccountRepository])],
  providers: [AccountResolver, AccountService],
  exports: [AccountService],
  controllers: [AccountController],
})
export class AccountModule {}
