import { ExceptionDTO } from '../../common/dto/exception.dto';
import { HttpStatus } from '@nestjs/common';

type TASK_EXCEPTION_KEY = 'NO_TOKEN' | 'TOKEN_UNAUTHORIZED';

export const TASK_EXCEPTION: Record<TASK_EXCEPTION_KEY, ExceptionDTO> = {
  NO_TOKEN: {
    errorCode: '00000001',
    message: 'No token provided...',
    status: HttpStatus.BAD_REQUEST,
  },
  TOKEN_UNAUTHORIZED: {
    errorCode: '00000002',
    message: 'Unauthorized token...',
    status: HttpStatus.BAD_REQUEST,
  },
};
