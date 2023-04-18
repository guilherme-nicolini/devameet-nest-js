import { IsEmail, MinLength, MaxLength, IsString, Matches } from "class-validator";
import { UserMesagesHeplper } from "../helpers/messages.helper";

export class RegisterDto {
    @MinLength(2, { message: UserMesagesHeplper.REGISTER_NAME_NOT_VALID })
    name: string;

    @IsEmail({}, { message: UserMesagesHeplper.REGISTER_EXIST_EMAIL_ACCOUNT })
    email: string;

    @MinLength(4, { message: UserMesagesHeplper.REGISTER_PASSWORD_NOT_VALID })
    @MaxLength(12, { message: UserMesagesHeplper.REGISTER_PASSWORD_NOT_VALID })
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: UserMesagesHeplper.REGISTER_PASSWORD_NOT_VALID })
    password: string;
    @IsString()
    avatar: string
}