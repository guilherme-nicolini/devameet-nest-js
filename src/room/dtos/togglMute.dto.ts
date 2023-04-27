import { IsBoolean } from "class-validator";
import { JoinRommDto } from "./join.room.dto";
import { RoomMessagesHelper } from "../helpers/room.messages.helper";

export class TogglMuteDto extends JoinRommDto {

    @IsBoolean({ message: RoomMessagesHelper.MUTE_NOT_VALID })
    muted: boolean

}