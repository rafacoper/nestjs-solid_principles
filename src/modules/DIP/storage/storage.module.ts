import { Module } from '@nestjs/common';
import { StorageController } from './storage.controller';
import { StorageS3Service } from './storage-s3.service';
import { StorageGCSService } from './storage-gcs.service';
import { StorageServiceFactory } from './storage.service.factory';

@Module({
  controllers: [StorageController],
  providers: [StorageS3Service, StorageGCSService, StorageServiceFactory],
  exports: [StorageServiceFactory],
})
export class StorageModule {}
