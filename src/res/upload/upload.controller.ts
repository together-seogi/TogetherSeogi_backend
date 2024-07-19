import { Controller, Get, Res, Param } from '@nestjs/common';
import { UploadService } from './upload.service';
import { Response } from 'express';
import { join } from 'path';


@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Get(':filename')
  getFile(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = join(process.cwd(), 'upload/', filename);
    const file = this.uploadService.getFile(filePath);
    file.getStream().pipe(res);
  }
}
