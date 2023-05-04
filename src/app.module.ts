import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsService } from './accounts.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SchemaModule } from './dish/schema.module';

@Module({
  imports: [
    SchemaModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5431,
      username: 'mamounanagreh',
      password: '1234',
      database: 'template1',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, AccountsService],
})
export class AppModule {}
