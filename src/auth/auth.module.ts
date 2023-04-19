import { Module } from "@nestjs/common";
import { AuthControlle } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserModule } from "src/user/user.module";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports:[
        UserModule,
        JwtModule.register({
            secret: process.env.USER_JWT_SECRET_KEY
        })],
    controllers: [AuthControlle],
    providers: [AuthService, JwtStrategy]
})
export class AuthModule { }