import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { loginDto } from "./dtos/login.dto";
import { messagesHelper } from "./helpers/messages.helpers";
import { RegisterDto } from "src/user/dtos/register.dto";
import { UserService } from "src/user/user.service";
import { UserMesagesHeplper } from "src/user/helpers/messages.helper";

@Injectable()
export class AuthService {
    private looger = new Logger(AuthService.name);
    constructor(private readonly userService: UserService) { }
    login(dto: loginDto) {
        this.looger.debug('login - started')
        if (dto.login !== 'teste@teste.com' || dto.password !== 'teste@123') {
            throw new BadRequestException(messagesHelper.AUTH_PASSWORD_OR_LOGIN_NOT_FOUND)
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