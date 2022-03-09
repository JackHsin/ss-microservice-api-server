import { UseGuards } from '@nestjs/common';
import { Mutation, Args, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../common/decorators/graphql-current-user.decorator';
import { AuthService } from './auth.service';
import { UserInfoDTO } from './dto/auth.dto';
import { LoginInput } from './dto/update-review.input';
import { LocalAuthGraphqlGuard } from './login/local-auth.guard';
import { Token } from './models/auth.modal';

@Resolver(() => Token)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => Token)
  @UseGuards(LocalAuthGraphqlGuard)
  Login(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Args('loginInput') loginInput: LoginInput,
    @CurrentUser() userInfo: UserInfoDTO,
  ) {
    return this.authService.login(userInfo);
  }
}
