import {  IsNumber, IsString, Max, Min } from "class-validator";
import { JoinRommDto } from "./join.room.dto";
import { MeetMessagesHelpers } from "src/meet/helpers/meetmessages.helper";


export class UpdateUserPositionDto extends JoinRommDto {

    @IsNumber({}, { message: MeetMessagesHelpers.UPDATE_XY_NOT_VALID })
    @Min(0, { message: MeetMessagesHelpers.UPDATE_XY_NOT_VALID })
    @Max(8, { message: MeetMessagesHelpers.UPDATE_XY_NOT_VALID })
    x: number;

    @IsNumber({}, { message: MeetMessagesHelpers.UPDATE_XY_NOT_VALID })
    @Min(0, { message: MeetMessagesHelpers.UPDATE_XY_NOT_VALID })
    @Max(8, { message: MeetMessagesHelpers.UPDATE_XY_NOT_VALID })
    y: number;

    @IsString({ message: MeetMessagesHelpers.UPDATE_ORIENTATION_NOT_VALID })
    orientation: string
}