import { Injectable } from '@nestjs/common';
import boardSchema from 'src/models/board.schema';
import Board from 'src/interface/board.interface';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Injectable()
export class BoardService {
  async getArticlesByCategory(category: String) {
    
  }

  async getArticlesByLikesAndCategory(category: String) {

  }

  async getArticlesByArticleId(articleId: Number) {

  }

  async getArticlesByUserId(userId: Number) {

  }

  async createArticle(createBoardDto: CreateBoardDto) {

  }

  // Edit의 경우 이미지 처리 관련하여 한번 더 체크하기
  update(id: number, updateBoardDto: UpdateBoardDto) {
    return `This action updates a #${id} board`;
  }

  async removeByArticleId(id: number) {
    const delArticle = await boardSchema.deleteOne({ articleId: id });
    return delArticle;
  }
}