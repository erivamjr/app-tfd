import { FileDto } from '../auth/dto/file.dto';

export abstract class IStorage {
  abstract upload(file: FileDto, folder: string): Promise<string>;
  abstract getSignedUrl(filePath: string): Promise<string>;
}
