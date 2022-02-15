import { Injectable } from '@nestjs/common';
import { In } from 'typeorm';
import { CreateAccountInput } from './dto/create-account.input';
import { UpdateAccountInput } from './dto/update-account.input';
import { AccountRepository } from './repositories/account.repository';

@Injectable()
export class AccountService {
  constructor(private accountRepository: AccountRepository) {}

  async create(createAccountInput: CreateAccountInput) {
    return await this.accountRepository.save(createAccountInput);
  }

  async findAll() {
    return await this.accountRepository.find();
  }

  async findByIds(ids: number[]) {
    return await this.accountRepository.find({ id: In(ids) });
  }

  async findOneByUsername(username: string) {
    return await this.accountRepository.findOne({ username });
  }

  async findOneById(id: number) {
    if (!id) {
      throw new Error('Invalid ID');
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
