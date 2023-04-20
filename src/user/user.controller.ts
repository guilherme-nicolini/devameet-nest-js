import { Controller, Get, Request, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { UserMesagesHeplper } from './helpers/messages.helper';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    async geUser(@Request() req) {
        const { userId } = req?.user;
        const user = await this.userService.getUserById(userId);

        if (!user) {
            throw new BadRequestException(UserMesagesHeplper.GET_USER_NOT_FOUND)
        }

        return {
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            iz: user._id
        }
    }
}