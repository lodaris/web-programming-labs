import { Injectable } from '@nestjs/common';

export interface FileMetadata {
  filename: string;
  originalname: string;
  size: number;
  mimetype: string;
  url: string;
}

@Injectable()
export class FilesService {
  private files: FileMetadata[] = [];

  save(meta: FileMetadata): FileMetadata {
    this.files.push(meta);
    return meta;
  }

  findAll(): FileMetadata[] {
    return this.files;
  }
}
