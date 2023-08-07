import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';
import * as sharp from 'sharp';

@Injectable()
export class FileService {
  async saveFile(file, folder) {
    console.log(file, folder);
    try {
      const fileName = `${uuid.v4()}.webp`;
      const filePath = path.resolve(__dirname, '../../../', `public/${folder}`);
      const nameFilePath = `${filePath}/${fileName}`;

      if (!file.originalname.match(/\.(jpg|jpeg|png|webp)$/)) {
        throw new Error();
      }

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }

      await sharp(file.buffer).webp({ quality: 80 }).toFile(nameFilePath);

      return fileName;
    } catch (e) {
      console.log(e);
      throw new HttpException(
        'Err file load',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async fileSaveSize(file, size, prevFile) {
    try {
      const fileName = `${uuid.v4()}.webp`;
      const filePath = path.resolve(__dirname, '../../../', 'public');
      const nameFilePath = `${filePath}/${fileName}`;

      if (!file.originalname.match(/\.(jpg|jpeg|png|webp)$/)) {
        throw new Error();
      }

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }

      await sharp(file.buffer)
        .webp({ quality: 80 })
        .resize(size)
        .toFile(nameFilePath);

      if (prevFile) {
        if (fs.existsSync(`${filePath}/${prevFile}`)) {
          fs.unlinkSync(`${filePath}/${prevFile}`);
          console.log('Файл успешно удален:', `${filePath}/${prevFile}`);
        } else {
          console.log('Файл не найден:', `${filePath}/${prevFile}`);
        }
      }

      return fileName;
    } catch (e) {
      console.log(e);
      throw new HttpException(
        'Err file load',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
