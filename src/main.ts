import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalFilters(new HttpExceptionFilter()); // 예외처리 필터
  app.useGlobalPipes(new ValidationPipe()); //* 파이프라인 구성
  app.enableCors({
    origin: true,
    credentials: true,
  });
  const PORT = process.env.PORT;

  await app.listen(PORT);
}
bootstrap();
