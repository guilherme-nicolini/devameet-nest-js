import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { loginDto } from "./dtos/login.dto";
import { messagesHelper } from "./helpers/messages.helpers";
import { RegisterDto } from "src/user/dtos/register.dto";
import { UserService } from "src/user/user.service";
import { UserMesagesHeplper } from "src/user/helpers/messages.helper";

@Injectable()
export class AuthService {
    private looger = new Logger(AuthService.name);

    constructor(private readonly userService: UserService,
        private readonly JwtService : JwtService
        ) { }

    async login(dto: loginDto) {
        this.looger.debug('login - started');

        const user = await this.userService.getUserByLoginPassword(dto.login, dto.password);

        if (user === null) {
            throw new BadRequestException(messagesHelper.AUTH_PASSWORD_OR_LOGIN_NOT_FOUND)
        }

const tokenPayload = {email:user.email, sub:user._id};
return {
    email: user.email,
    name: user.name,
    token:this.JwtService.sign(tokenPayload, {secret: process.env.User_JWT_SECRET_KEY})
}

        return dto;
    }

    async register(dto: RegisterDto) {
        this.looger.debug('register - started');
        if (await this.userService.existsByEmail(dto.email)) {
            throw new BadRequestException(UserMesagesHeplper.REGISTER_EXIST_EMAIL_ACCOUNT)
        }

        await this.userService.create(dto);
    }
}