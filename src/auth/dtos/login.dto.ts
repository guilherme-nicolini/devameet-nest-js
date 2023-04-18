import { IsEmail, IsNotEmpty } from "class-validator"
import { messagesHelper } from "../helpers/messages.helpers"

export class loginDto {
    @IsEmail({}, { message: messagesHelper.AUTH_LOGIN_NOT_FOUND })
    login: string;
    @IsNotEmpty({ message: messagesHelper.AUTH_PASSWORD_OR_LOGIN_NOT_FOUND })
    password: string;
}