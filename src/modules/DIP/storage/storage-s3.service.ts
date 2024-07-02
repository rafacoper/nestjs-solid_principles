import { Injectable } from '@nestjs/common';
import { StorageService } from './storage.service';
import * as AWS from 'aws-sdk';

const s3 = new AWS.S3();

@Injectable()
export class StorageS3Service implements StorageService {
  public async findFile(filename: string): Promise<any> {
    const params = {
      Bucket: 'STORAGE',
      Key: filename,
    };

    try {
      const data = await s3.getObject(params).promise();
      return data.Body;
    } catch (error) {
      console.error(error);
      throw new Error('Error fetching the file from S3');
    }
  }

  public async saveFile(filename: string, data: any): Promise<void> {
    const params = {
      Bucket: 'STORAGE',
      Key: filename,
      Body: data,
    };

    try {
      await s3.putObject(params).promise();
    } catch (error) {
      console.error(error);
      throw new Error('Error saving the file to S3');
    }
  }

  public async deleteFile(filename: string): Promise<void> {
    const params = {
      Bucket: 'STORAGE',
      Key: filename,
    };

    try {
      await s3.deleteObject(params).promise();
    } catch (error) {
      console.error(error);
      throw new Error('Error deleting the file from S3');
    }
  }
}
