import { Injectable } from '@nestjs/common';
import boardSchema from 'src/models/board.schema';
import Board from 'src/interface/board.interface';
import genId from 'src/utils/genId.util';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Injectable()
export class BoardService {
  // 50개 리턴, 카운트별로 스킵기능 추가
  async getArticlesByCategory(category: String, count: number) {
                        
  }

  // Gajang Joayo Suga Nopeun 4gaeman print
  // i cannot type korean well (fuck rhel)
  async getArticlesByLikesAndCategory(category: String) {
    
  }

  async getArticlesByArticleId(articleId: Number) {
    
  }

  async getArticlesByUserId(userId: Number) {

  }

  async createArticle(newBoardData: Board, imgFileName: String, request: any) {
    let aId = await genId();
    const newArticle = await new boardSchema({
      writerId: request.user.userId,
      articleId: aId,
      category: newBoardData.category,
      imgFileName: imgFileName,
      title: newBoardData.title,
      content: newBoardData.content,
      likes: 0, hates: 0, views: 0
    }).save();
    return aId;
  }

  // Edit의 경우 이미지 처리 관련하여 한번 더 체크하기
  async updateArticle(BoardData: Board) {
    
  }

  async removeByArticleId(id: number) {
    const delArticle = await boardSchema.deleteOne({ articleId: id });
    return delArticle;
  }
}