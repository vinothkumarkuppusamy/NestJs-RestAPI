import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { PropertyController } from './property/property.controller';
import { PropertyModule } from './property/property.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { pgConfig } from 'dbConfig';
import { ProductModule } from './product/product.module';

@Module({
  imports: [AuthenticationModule, PropertyModule, TypeOrmModule.forRoot(pgConfig), ProductModule],
  controllers: [AppController, PropertyController],
  providers: [AppService],
})
export class AppModule {}
