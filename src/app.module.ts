import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { jwtAuthGuard } from './auth/guards/jwt.guard';


@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    AuthModule,
    UserModule
  ],
  controllers: [],
  providers: [
    { provide: APP_GUARD, useClass: jwtAuthGuard }
  ],
})
export class AppModule { }
