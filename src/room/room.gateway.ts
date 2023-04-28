import { OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { RoomService } from './room.service';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { JoinRommDto } from './dtos/join.room.dto';
import { UpdateUserPositionDto } from './dtos/update.position.dto';
import { TogglMuteDto } from './dtos/togglMute.dto';

type ActiveSocketsType = {
  room: string;
  id: string;
  userId: string
}

@WebSocketGateway({ cors: true })
export class RoomGateway implements OnGatewayInit, OnGatewayDisconnect {

  constructor(private readonly service: RoomService) { }

  @WebSocketServer() wss: Server;

  private logger = new Logger(RoomGateway.name);

  private activeSockets: ActiveSocketsType[] = [];


  handleDisconnect(client: any) {
    this.logger.debug(`Client: ${client.id} disconnected`);
  }

  afterInit(server: any) {
    this.logger.log('Gateway initialized');
  }

  @SubscribeMessage('join')
  async handleJoin(client: Socket, payload: JoinRommDto) {
    const { link, userId } = payload;

    const existinOnsocket = this.activeSockets.find(socket => socket.room === link && socket.id === client.id);

    if (!existinOnsocket) {
      this.activeSockets.push({ room: link, id: client.id, userId });

      const dto = {
        link,
        userId,
        x: 2,
        y: 2,
        orientation: 'down'
      } as UpdateUserPositionDto

      await this.service.updateUserPosition(client.id, dto);
      const users = await this.service.listUsersPositionByLink(link);

      this.wss.emit(`${link}-update-user-list`, { users });
      client.broadcast.emit(`${link}-add-user`, { user: client.id });
    }

    this.logger.debug(`Socket client: ${client.id} start to join room ${link}`)

  }

  @SubscribeMessage('move')
  async handleMove(client: Socket, payload: UpdateUserPositionDto) {
    const { link, userId, x, y, orientation } = payload;

    const dto = {
      link,
      userId,
      x,
      y,
      orientation
    } as UpdateUserPositionDto

    await this.service.updateUserPosition(client.id, dto);
    const users = await this.service.listUsersPositionByLink(link);
    this.wss.emit(`${link}-update-user-list`, { users });

  }

  @SubscribeMessage('toggl-mute-user')
  async handleTogglMute(client: Socket, payload: TogglMuteDto) {
    const { link } = payload;



    await this.service.updateUserMute(payload);
    const users = await this.service.listUsersPositionByLink(link);
    this.wss.emit(`${link}-update-user-list`, { users });

  }

}

