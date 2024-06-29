import { Injectable, Inject } from '@nestjs/common';
import { StorageService } from './storage.service';
import { StorageS3Service } from './storage-s3.service';
import { StorageGCSService } from './storage-gcs.service';

@Injectable()
export class StorageServiceFactory {
  constructor(
    @Inject(StorageS3Service) private readonly s3Service: StorageS3Service,
    @Inject(StorageGCSService) private readonly gcsService: StorageGCSService,
  ) {}

  create(storageType: 's3' | 'gcs'): StorageService {
    switch (storageType) {
      case 's3':
        return this.s3Service;
      case 'gcs':
        return this.gcsService;
      default:
        throw new Error('Unsupported storage type');
    }
  }
}
