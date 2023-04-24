import { IsString, MinLength } from "class-validator";
import { UserMesagesHeplper } from "../helpers/messages.helper";


export class UpdateUserDto {
    @MinLength(2,{message:UserMesagesHeplper.REGISTER_NAME_NOT_VALID})
    name:string;

    @IsString()
    avatar:string;
}