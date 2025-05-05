import { Controller, Get, Param } from '@nestjs/common';
import { CommsService } from './comms.service';

@Controller('comms')
export class CommsController {
  constructor(private readonly commsService: CommsService) {}

  @Get('your-next-delivery/:userId')
  getUserNextDeliveryMsg(@Param('userId') id: string) {
    return this.commsService.getNextDeliveryMsg(id);
  }
}
