import * as multer from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

const createFolder = (folder: string) => {
  try {
    console.log('💾 Create a root uploads folder...');
    fs.mkdirSync(path.join(__dirname, '..', `uploads`)); //폴더만드는 명령어 upload라는 폴더
  } catch (error) {
    console.log('The folder already exists...');
  }
  try {
    console.log(`💾 Create a ${folder} uploads folder...`);
    fs.mkdirSync(path.join(__dirname, '..', `uploads/${folder}`)); //폴더안에 이미지를 넣음
  } catch (error) {
    console.log(`The ${folder} folder already exists...`); //이미 있을시
  }
};

const storage = (folder: string): multer.StorageEngine => {
  createFolder(folder);
  return multer.diskStorage({
    destination(req, file, cb) {
      //* 어디에 저장할 지
      const folderName = path.join(__dirname, '..', `uploads/${folder}`);
      cb(null, folderName);
    },
    filename(req, file, cb) {
      //* 어떤 이름으로 올릴 지
      const ext = path.extname(file.originalname); //확장자 추출 path.extname('index.html') -> html반환 ext = 확장자

      const fileName = `${path.basename(
        file.originalname,
        ext,
      )}${Date.now()}${ext}`;

      cb(null, fileName);
    },
  });
};

export const multerOptions = (folder: string) => {
  const result: MulterOptions = {
    storage: storage(folder),
  };
  return result;
};
