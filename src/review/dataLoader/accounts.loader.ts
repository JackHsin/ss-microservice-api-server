import * as DataLoader from 'dataloader';
import { AccountService } from '../../account/account.service';
import { Account } from '../../account/entities/account.entity.gql';

// Ref: https://dev.to/filipegeric/using-graphql-dataloaders-with-nestjs-2jo1
export function reviewAccountsLoader(accountService: AccountService) {
  return new DataLoader<number, Account>(async (ids) => {
    const accounts = await accountService.findByIds(ids as number[]);

    console.log('\x1b[32m', '\n--------------Debug----------------\n');
    console.log('\x1b[36m', `createUsersLoader ${ids}, users = `, accounts);
    console.log('\x1b[32m', '\n-----------------------------------', '\x1b[0m');

    // The return user Data order has to be same as the ids order
    const res = ids.map((id) => accounts.find((account) => account.id === id));
    console.log('\x1b[32m', '\n--------------Debug----------------\n');
    console.log('\x1b[36m', `res = `, res);
    console.log('\x1b[32m', '\n-----------------------------------', '\x1b[0m');
    return res;
  });
}
