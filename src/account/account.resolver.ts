import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AccountService } from './account.service';
import { Account, AccountId } from './entities/account.entity.gql';
import { CreateAccountInput } from './dto/create-account.input';
import { UpdateAccountInput } from './dto/update-account.input';
import { UseGuards } from '@nestjs/common';
import { GqlJwtAuthGuard } from '../auth/jwt/graphql-jwt-auth.guard';
import { RoleTypeEnum } from './enum/account.enum';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from './guard/roles.guard';
import { CurrentUser } from '../common/decorators/graphql-current-user.decorator';
import { CurrentUserDTO } from '../common/dto/current-user-decorator.dto';

@UseGuards(RolesGuard)
@UseGuards(GqlJwtAuthGuard)
@Roles(RoleTypeEnum.ADMIN)
@Resolver(() => Account)
export class AccountResolver {
  constructor(private accountService: AccountService) {}

  @Mutation(() => Account)
  async createAccount(
    @Args('createAccountInput') createAccountInput: CreateAccountInput,
  ) {
    return await this.accountService.create(createAccountInput);
  }

  @Query(() => [Account], { name: 'findAll' })
  async findAll() {
    return await this.accountService.findAll();
  }

  @Query(() => [Account], { name: 'findByIds' })
  async findByIds(@Args({ name: 'ids', type: () => [Number] }) ids: number[]) {
    return await this.accountService.findByIds(ids);
  }

  @Roles(RoleTypeEnum.ADMIN, RoleTypeEnum.EMPLOYEE)
  @Query(() => Account, { name: 'findOne' })
  async findOne(@CurrentUser() user: CurrentUserDTO) {
    return await this.accountService.findOneById(user.sub);
  }

  @Query(() => Account, { name: 'findOneByUsername' })
  async findOneByUsername(@Args('username') username: string) {
    return await this.accountService.findOneByUsername(username);
  }

  @Mutation(() => Account)
  async updateAccount(
    @Args('updateAccountInput') updateAccountInput: UpdateAccountInput,
  ) {
    await this.accountService.update(updateAccountInput.id, updateAccountInput);
    return updateAccountInput;
  }

  @Mutation(() => AccountId)
  async removeAccount(@Args('id', { type: () => Int }) id: number) {
    await this.accountService.remove(id);
    return { id };
  }
}
