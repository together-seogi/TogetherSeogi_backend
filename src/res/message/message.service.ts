import { Injectable } from '@nestjs/common';
import Msg from 'src/interface/message.interface';
import messageSchema from 'src/models/message.schema';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Injectable()
export class MessageService {
  async create(newMsg: Msg) {
    const msg = await new messageSchema({
      senderId: newMsg.senderId,
      receiverId: newMsg.receiverId,
      content: newMsg.content
    });
    return msg;
  }

  async findByReceiverId(receiverId: number) {
    const msgs = (await messageSchema.find({ receiverId: receiverId })).reverse();
    return msgs ?? null;
  }

  async findOneByMsgData(receiverId: Number, dateMs: Number) {
    const message = await messageSchema.findOne({
      receiverId: receiverId,
      createdAt: dateMs
    });
    if (!message) return null;
    else return message;
  }
}