import { Controller, Get, Post, Put, Body, Patch, Param, Delete } from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { PROPERTY_DEPS_METADATA } from '@nestjs/common/constants';

/**
 * 구현해야할 것
 * GET (by category)
 * GET (by likes & category)
 * GET (by article ID)
 * GET (by userId)
 * POST (article Write)
 * PUT (article Edit, entire data)
 * DELETE (by article Id)
 */

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get('ct/:category')
  getArticlesByCategory(@Param('category') ct: String) {
    return this.boardService.getArticlesByCategory(ct);
  }

  @Get('likes/:category')
  getArticlesByLikesAndCategory(@Param('category') ct: String) {
    return this.boardService.getArticlesByLikesAndCategory(ct);
  }

  @Get('aid/:articleId')
  getArticlesByArticleId(@Param('articleId') aid: Number) {
    return this.boardService.getArticlesByArticleId(aid);
  }

  @Get('uid/:userId')
  getArticlesByUserId(@Param('userId') uid: Number) {
    return this.boardService.getArticlesByUserId(uid);
  }

  @Post('write') // Body & Image(multer) 추가 필요
  createArticle() {
    return this.boardService.createArticle('');
  }

  @Put('edit')
  updateArticle(@Param('id') id: string, @Body() updateBoardDto: UpdateBoardDto) {
    return this.boardService.update(+id, updateBoardDto);
  }

  @Delete('del/:id')
  removeByArticleId(@Param('id') id: string) {
    return this.boardService.removeByArticleId(+id);
  }
}