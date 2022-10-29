import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      // In a real application, these would be read from configuration
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'demo',
      password: 'srvcontdemo123&', // only local development DB passwords would be found in source code, sensitive values must always be stored in a secure vault
      database: 'localdev',
      entities: [],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
