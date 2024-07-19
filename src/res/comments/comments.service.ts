import { Injectable } from '@nestjs/common';
import commentSchema from 'src/models/comment.schema';
import Comment from 'src/interface/comment.interface';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  async get(articleId: Number) {
    const cmts = await commentSchema.find({ articleId: articleId });
    return cmts;
  }

  async create(newCmts: Comment) {
    const cmts = await new commentSchema({
      articleId: newCmts.articleId,
      writerId: newCmts.writerId,
      content: newCmts.content
    }).save();
    return 'OK';
  }

  async remove(articleId: Number, writerId: Number) {
    await commentSchema.findOneAndDelete({
      articleId: articleId,
      writerId: writerId
    });
    return 'OK';
  }
}
