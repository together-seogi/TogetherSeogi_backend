import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MessageService } from './message.service';
import Msg from 'src/interface/message.interface';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

// 쪽지 컨트롤러
@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post() // Send Message
  createMessage(@Body() newMsg: Msg) {
    return this.messageService.create(newMsg);
  }

  @Get(':receiverId')
  findOByReceiverId(@Param('receiverId') rid: Number) {
    return this.messageService.findByReceiverId(+rid);
  }

  @Get(':receiverId/:dateMs')
  findAll(@Param('receiverId') rid: Number, @Param('dateMs') dms: Number) {
    return this.messageService.findOneByMsgData(rid, dms);
  }
}
