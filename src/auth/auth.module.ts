import { Module } from "@nestjs/common";
import { AuthControlle } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
    imports: [],
    controllers: [AuthControlle],
    providers: [AuthService]
})
export class AuthModule { }