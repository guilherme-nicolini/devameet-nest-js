import { IsArray, IsNotEmpty, IsNumber, IsString, Max, Min, ValidateNested } from "class-validator";
import { CreateMeetDto } from "./createmeet.dtos";
import { MeetMessagesHelpers } from "../helpers/meetmessages.helper";
import { Type } from "class-transformer";


export class UpdateMeetDto extends CreateMeetDto {
    @IsArray({ message: MeetMessagesHelpers.UPDATE_OBJECT_NAME_NOT_VALID })
    @Type(() => UpdateMeetObjectDtO)
    @ValidateNested({ each: true })
    object: Array<UpdateMeetObjectDtO>
    
}

export class UpdateMeetObjectDtO {
    @IsNotEmpty({ message: MeetMessagesHelpers.UPDATE_OBJECT_NAME_NOT_VALID })
    name: string;

    @IsNumber({}, { message: MeetMessagesHelpers.UPDATE_XY_NOT_VALID })
    @Min(0, { message: MeetMessagesHelpers.UPDATE_XY_NOT_VALID })
    @Max(8, { message: MeetMessagesHelpers.UPDATE_XY_NOT_VALID })
    x: number;

    @IsNumber({}, { message: MeetMessagesHelpers.UPDATE_XY_NOT_VALID })
    @Min(0, { message: MeetMessagesHelpers.UPDATE_XY_NOT_VALID })
    @Max(8, { message: MeetMessagesHelpers.UPDATE_XY_NOT_VALID })
    y: number;

    @IsNumber({}, { message: MeetMessagesHelpers.UPDATE_ZINDEX_NOT_VALID })
    zIndex: number;

    @IsString({message:MeetMessagesHelpers.UPDATE_ORIENTATION_NOT_VALID})
    orientation: string;
}