import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class StorageService {
  abstract findFile(filename: string): Promise<any>;
  abstract saveFile(filename: string, data: any): Promise<void>;
  abstract deleteFile(filename: string): Promise<void>;
}
