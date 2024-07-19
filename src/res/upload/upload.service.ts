import { Injectable, StreamableFile } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';

@Injectable()
export class UploadService {
    getFile(filePath: string): StreamableFile {
        const file = createReadStream(filePath);
        return new StreamableFile(file);
      }
}
