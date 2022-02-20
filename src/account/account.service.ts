import { Injectable } from '@nestjs/common';
import { In } from 'typeorm';
import { AccountRegisterDTO } from './dto/account.dto';
import { CreateAccountInput } from './dto/create-account.input';
import { UpdateAccountInput } from './dto/update-account.input';
import { AccountPO } from './po/account.po';
import { AccountRepository } from './repositories/account.repository';
import { SSHttpException } from '../common/exceptions/ss-http-exception';
import { TASK_EXCEPTION } from './constants/exception.constant';

const { ACCOUNT_REGISTERED, INVALID_ID, ACCOUNT_NOT_FOUND } = TASK_EXCEPTION;

@Injectable()
export class AccountService {
  constructor(private accountRepository: AccountRepository) {}

  async create(createAccountInput: CreateAccountInput) {
    return await this.accountRepository.save(createAccountInput);
  }

  async registerAccount(accountRegisterDTO: AccountRegisterDTO) {
    const account = await this.accountRepository.findOne({
      username: accountRegisterDTO.username,
    });

    if (!account) return await this.accountRepository.save(accountRegisterDTO);
    else throw new SSHttpException(ACCOUNT_REGISTERED);
  }

  async findAll() {
    return await this.accountRepository.find();
  }

  async findByIds(ids: number[]) {
    return await this.accountRepository.find({ id: In(ids) });
  }

  async findOneByUsername(username: string) {
    const accountEntity = await this.accountRepository.findOne({ username });
    if (!accountEntity) throw new SSHttpException(ACCOUNT_NOT_FOUND);
    return AccountPO.entityToClass(accountEntity);
  }

  async findOneById(id: number) {
    if (!id) {
      throw new SSHttpException(INVALID_ID);
    }
    return await this.accountRepository.findOne(id);
  }

  async update(id: number, updateAccountInput: UpdateAccountInput) {
    return await this.accountRepository.update(id, { ...updateAccountInput });
  }

  async remove(id: number) {
    return await this.accountRepository.delete(id);
  }
}
