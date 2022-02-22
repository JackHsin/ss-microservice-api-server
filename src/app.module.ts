import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReviewModule } from './review/review.module';
import { AccountModule } from './account/account.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from './account/entities/account.entity';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { AccountService } from './account/account.service';
import { reviewAccountsLoader } from './review/dataLoader/accounts.loader';

const {
  POSTGRES_DB_HOST,
  POSTGRES_DB_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DATABASE,
} = process.env;

@Module({
  imports: [
    AccountModule,
    ReviewModule,
    TypeOrmModule.forRoot({
      autoLoadEntities: true,
      type: 'postgres',
      host: POSTGRES_DB_HOST,
      port: parseInt(POSTGRES_DB_PORT),
      username: POSTGRES_USER,
      password: POSTGRES_PASSWORD,
      database: POSTGRES_DATABASE,
      entities: [AccountEntity],
      logging: 'all',
    }),
    GraphQLModule.forRootAsync({
      imports: [AccountModule],
      useFactory: (accountService: AccountService) => ({
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        sortSchema: true,
        cors: {
          origin: 'http://localhost:3001',
          credentials: true,
        },
        context: () => ({
          // randomValue: Math.random(),
          // Ref: https://dev.to/filipegeric/using-graphql-dataloaders-with-nestjs-2jo1
          accountsLoader: reviewAccountsLoader(accountService),
        }),
      }),
      inject: [AccountService],
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
