import { Injectable } from '@nestjs/common';
import { StorageFetcher } from './storage.service';
import { Storage } from '@google-cloud/storage';

const gcs = new Storage();
const bucket = gcs.bucket('STORAGE');

@Injectable()
export class StorageGCSService implements StorageFetcher {
  public async findFile(filename: string): Promise<any> {
    const file = bucket.file(filename);
    try {
      const data = await file.download();
      return data[0]; // Return the file data in the response
    } catch (error) {
      console.error(error);
      throw new Error('Error fetching the file from GCS');
    }
  }

  public async saveFile(filename: string, data: any): Promise<void> {
    const file = bucket.file(filename);
    try {
      await file.save(data);
    } catch (error) {
      console.error(error);
      throw new Error('Error saving the file to GCS');
    }
  }

  public async deleteFile(filename: string): Promise<void> {
    const file = bucket.file(filename);
    try {
      await file.delete();
    } catch (error) {
      console.error(error);
      throw new Error('Error deleting the file from GCS');
    }
  }
}
