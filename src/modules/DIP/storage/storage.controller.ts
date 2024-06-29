import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { StorageServiceFactory } from './storage.service.factory';

@Controller('/storage')
export class StorageController {
  constructor(private readonly storageServiceFactory: StorageServiceFactory) {}

  @Get('/file/:filename')
  public async getFile(
    @Param('filename') filename: string,
    @Query('storageType') storageType: 's3' | 'gcs',
  ): Promise<any> {
    const storageService = this.storageServiceFactory.create(storageType);
    return await storageService.findFile(filename);
  }

  @Post('/file/:filename')
  public async saveFile(
    @Param('filename') filename: string,
    @Query('storageType') storageType: 's3' | 'gcs',
    @Body() data: any,
  ): Promise<void> {
    const storageService = this.storageServiceFactory.create(storageType);
    await storageService.saveFile(filename, data);
  }

  @Delete('/file/:filename')
  public async deleteFile(
    @Param('filename') filename: string,
    @Query('storageType') storageType: 's3' | 'gcs',
  ): Promise<void> {
    const storageService = this.storageServiceFactory.create(storageType);
    await storageService.deleteFile(filename);
  }
}
