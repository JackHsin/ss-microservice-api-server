import { ExceptionDTO } from '../../common/dto/exception.dto';
import { HttpStatus } from '@nestjs/common';

type TASK_EXCEPTION_KEY =
  | 'ACCOUNT_REGISTERED'
  | 'INVALID_ID'
  | 'ACCOUNT_NOT_FOUND'
  | 'INVALID_PASSWORD';

export const TASK_EXCEPTION: Record<TASK_EXCEPTION_KEY, ExceptionDTO> = {
  ACCOUNT_REGISTERED: {
    errorCode: '00000001',
    message: 'Account had been registered...',
    status: HttpStatus.BAD_REQUEST,
  },
  INVALID_ID: {
    errorCode: '00000002',
    message: 'Account ID is invalid...',
    status: HttpStatus.BAD_REQUEST,
  },
  ACCOUNT_NOT_FOUND: {
    errorCode: '00000003',
    message: 'Username or Password is incorrect...',
    status: HttpStatus.BAD_REQUEST,
  },
  INVALID_PASSWORD: {
    errorCode: '00000004',
    message: 'Username or Password is incorrect...',
    status: HttpStatus.BAD_REQUEST,
  },
};
