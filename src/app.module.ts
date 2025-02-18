import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { PropertyController } from './property/property.controller';
import { PropertyModule } from './property/property.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import dbConfig from './config/db.config';
import dbconfigProduction from './config/db.config.production';

@Module({
  imports: [
    ConfigModule.forRoot({  // works globally config .env file
      isGlobal: true, 
      expandVariables: true,
      load: [dbConfig, dbconfigProduction]
    }),
    AuthenticationModule, 
    PropertyModule, 
    TypeOrmModule.forRootAsync({
      useFactory: process.env.NODE_ENV == "prodcution"? dbconfigProduction : dbConfig, // If NODE_ENV presents production server will be run in production else its run in local
    }), 
    ProductModule, UserModule, AuthModule
  ],
  controllers: [AppController, PropertyController],
  providers: [AppService],
})
export class AppModule {}
