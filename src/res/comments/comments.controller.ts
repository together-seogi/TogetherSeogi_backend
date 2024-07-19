import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommentsService } from './comments.service';
import commentSchema from 'src/models/comment.schema';
import Comment from 'src/interface/comment.interface';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get(':articleId')
  get(@Param('articleId') aid: Number) {
    return this.commentsService.get(aid);
  }

  @Post(':articleId')
  create(@Body() newComment: Comment) {
    return this.commentsService.create(newComment);
  }

  @Delete(':articleId/:writerId')
  remove(@Param('articleId') aid: Number, @Param('writerId') uid: Number) {
    return this.commentsService.remove(aid, uid);
  }
}
