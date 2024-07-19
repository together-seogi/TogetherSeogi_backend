import { Injectable } from '@nestjs/common';
import boardSchema from 'src/models/board.schema';
import Board from 'src/interface/board.interface';
import genId from 'src/utils/genId.util';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { readFile } from 'fs/promises';
import { config } from 'dotenv';
config();

let env = process.env;

@Injectable()
export class BoardService {
  async getImage(fileName: string) {
    const imageBuffer = await readFile(`./upload/${fileName}`);
    return imageBuffer.buffer;
  }

  async getMainArticles() {
    const tipArticles = await boardSchema.find({ category: 'tips' })
    .limit(3).sort({"likes": -1});
    const eatArticles = await boardSchema.find({ category: 'eats' })
    .limit(4).sort({"likes": -1});
    const goodArticles = await boardSchema.find({ category: 'good' })
    .limit(4).sort({"likes": -1});
    // @ts-ignore
    let returnArr = [...tipArticles, ...eatArticles, ...goodArticles];
    return returnArr;
  }

  // 50개 리턴, 카운트별로 스킵기능 추가
  async getArticlesByCategory(category: String, count: number) {
    const articles = await boardSchema.find({ category: category })
    .skip((count - 1) * 50).limit(50).sort({ "createdAt": -1 });
    return articles;
  }

  async getArticlesByArticleId(articleId: Number) {
    const article = await boardSchema.findOne({ articleId: articleId });
    return article;
  }

  async getArticlesByUserId(userId: Number, count: number) {
    const articles = await boardSchema.find({ writerId: userId })
    .skip((count - 1) * 50).limit(50).sort({ "createdAt": -1 });
    return articles;
  }

  async findArticleWithWord(word: string, count: number) {
    const regex = new RegExp(word, "i");
    const articles = await boardSchema.find({ content: regex })
    .skip((count-1)*50).limit(50).sort({"createdAt":-1});
    return articles;
  }

  async createArticle(newBoardData: Board, imgFileName: string, request: any) {
    let aId = await genId();
    let imgBuffer = await this.getImage(imgFileName);
    const newArticle = await new boardSchema({
      writerId: request.user ? request.user.userId : 1111, // For dev
      articleId: aId,
      category: newBoardData.category,
      imgUrl: `${env.HTTP_PROTOCOL}://${env.DOMAIN}/api/upload/${imgFileName}`,
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