import { 
  Controller,
  Get, Post, Put, Patch, Delete, Req,
  Body, Param,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
  ExecutionContext,
  Injectable
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { BoardService } from './board.service';
import Board from 'src/interface/board.interface';
import boardSchema from 'src/models/board.schema';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { PROPERTY_DEPS_METADATA } from '@nestjs/common/constants';
import * as multer from 'multer';
import * as crypto from 'crypto';
import * as path from 'path';
import { Request } from 'express';

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

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './upload');
  },
  filename: (req, file, cb) => {
    const userId = req.body.userId; // Assuming userId is in the request body
    const randomHash = crypto.randomBytes(16).toString('hex');
    const ext = path.extname(file.originalname);
    const filename = `${userId}-${randomHash}${ext}`;
    cb(null, filename);
  },
});

const uploadOptions: MulterOptions = {
  storage: storage,
};


@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  // GET 메서드에서는 1회에 50개씩 전송할 예정
  @Get('ct/:category/:count')
  getArticlesByCategory(@Param('category') ct: String, @Param('count') cnt: number) {
    return this.boardService.getArticlesByCategory(ct, cnt);
  }

  // 여기서는 좋아요 높은 순으로 4개씩 받아올 예정
  @Get('likes/:category/')
  getArticlesByLikesAndCategory(@Param('category') ct: String) {
    return this.boardService.getArticlesByLikesAndCategory(ct);
  }

  @Get('aid/:articleId')
  getArticlesByArticleId(@Param('articleId') aid: Number) {
    return this.boardService.getArticlesByArticleId(aid);
  }

  // 여기도 1번에 50개씩
  @Get('uid/:userId/:count')
  getArticlesByUserId(@Param('userId') uid: Number) {
    return this.boardService.getArticlesByUserId(uid);
  }

  @Post('write') // Body & Image(multer) 추가 필요
  @UseInterceptors(FileInterceptor('file', uploadOptions))
  createArticle(@UploadedFile() file: Express.Multer.File, @Body() newArticleData: Board, @Req() req: Request) {
    return this.boardService.createArticle(newArticleData, file.filename, req);
  }

  @Put('edit')
  updateArticle(@Param('id') id: string, @Body() updateBoardDto: Board) {
    return this.boardService.updateArticle(updateBoardDto);
  }

  @Delete('del/:id')
  removeByArticleId(@Param('id') id: string) {
    return this.boardService.removeByArticleId(+id);
  }
}