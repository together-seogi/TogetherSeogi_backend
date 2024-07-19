import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './res/auth/auth.module';
import { BoardModule } from './res/board/board.module';
import { MessageModule } from './res/message/message.module';
import { UploadModule } from './res/upload/upload.module';
import { CommentsModule } from './res/comments/comments.module';
import { config } from 'dotenv';
config();

let env = process.env;

@Module({
  imports: [
    AuthModule,
    BoardModule,
    MessageModule,
    UploadModule,
    CommentsModule,
    PassportModule.register({ session: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
