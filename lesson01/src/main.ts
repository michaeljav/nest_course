import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule, { bufferLogs: true }); //to use logger service globally
  const app = await NestFactory.create(AppModule);
  // app.useLogger(app.get('MyLoggerService')); //to use logger service globally
  app.enableCors();
  app.setGlobalPrefix('api');

  await app.listen(3000);
}
bootstrap();
