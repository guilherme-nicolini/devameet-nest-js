import { Module } from "@nestjs/common";
import { AuthControlle } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserModule } from "src/user/user.module";

@Module({
    imports: [UserModule],
    controllers: [AuthControlle],
    providers: [AuthService]
})
export class AuthModule { }