import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../constants/constants';
import { SSHttpException } from '../../common/exceptions/ss-http-exception';
import { TASK_EXCEPTION } from '../constants/exception.constant';

const { NO_TOKEN, TOKEN_UNAUTHORIZED } = TASK_EXCEPTION;

@Injectable()
export class JwtAuthGuard implements CanActivate {
  private readonly logger: Logger = new Logger(JwtAuthGuard.name);
  private readonly jwtService = new JwtService({
    secret: jwtConstants.secret,
  });

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    let { authorization: token } = request.headers;

    if (!token) {
      throw new SSHttpException(NO_TOKEN);
    }

    // Get rid of 'Bearer' prefix
    token = token.split(' ')[1];

    try {
      const result = await this.jwtService.verifyAsync(token);
      if (!result) {
        this.logger.warn(`token 驗證錯誤, token: ${token}`);
        throw new SSHttpException(TOKEN_UNAUTHORIZED);
      }

      request.user = result;

      return true;
    } catch (error) {
      this.logger.warn(`token jwt-auth 未知的錯誤, token: ${token}`);
      this.logger.error(error);
      throw new SSHttpException(TOKEN_UNAUTHORIZED);
    }
  }
}
