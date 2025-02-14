import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { PropertyController } from './property/property.controller';
import { PropertyModule } from './property/property.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { ConfigModule } from '@nestjs/config';
import dbConfig from './config/db.config';

@Module({
  imports: [
    ConfigModule.forRoot({  // works globally config .env file
      isGlobal: true, 
      expandVariables: true,
      load: [dbConfig]
    }),
    AuthenticationModule, 
    PropertyModule, 
    TypeOrmModule.forRootAsync({
      useFactory: dbConfig,
    }), 
    ProductModule
  ],
  controllers: [AppController, PropertyController],
  providers: [AppService],
})
export class AppModule {}
