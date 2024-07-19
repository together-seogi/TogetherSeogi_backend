import { Injectable } from '@nestjs/common';
import boardSchema from 'src/models/board.schema';
import Board from 'src/interface/board.interface';
import genId from 'src/utils/genId.util';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { readFile } from 'fs/promises';

@Injectable()
export class BoardService {
  async getImage(fileName: string) {
    const imageBuffer = await readFile(`./upload/${fileName}`);
    return imageBuffer.buffer;
  }

  // 50개 리턴, 카운트별로 스킵기능 추가
  async getArticlesByCategory(category: String, count: number) {
    const articles = await boardSchema.find({ category: category })
    .skip((count - 1) * 50).limit(50).sort({ "createdAt": -1 });
    return articles;
  }

  // Gajang Joayo Suga Nopeun 4gaeman print
  // i cannot type korean well (fuck rhel)
  async getArticlesByLikesAndCategory(category: String) {
    
  }

  async getArticlesByArticleId(articleId: Number) {
    
  }

  async getArticlesByUserId(userId: Number) {

  }

  async createArticle(newBoardData: Board, imgFileName: string, request: any) {
    let aId = await genId();
    let imgBuffer = await this.getImage(imgFileName);
    const newArticle = await new boardSchema({
      writerId: request.user ? request.user.userId : 1111, // For dev
      articleId: aId,
      category: newBoardData.category,
      img: {
        fileName: imgFileName.toString(),
        fileBuffer: imgBuffer
      },
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