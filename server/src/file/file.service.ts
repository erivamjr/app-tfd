import { Injectable } from '@nestjs/common';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import * as fs from 'fs';

@Injectable()
export class FileService {
  async upload(file: Express.Multer.File, filePath: string) {
    const avatarDirectory = join(__dirname, '..', '..', 'storage', 'avatar');

    if (!fs.existsSync(avatarDirectory)) {
      fs.mkdirSync(avatarDirectory, { recursive: true });
    }

    const fileAvatar = await writeFile(filePath, file.buffer);
    return { message: 'Avatar updated with success!', fileAvatar };
  }
}
