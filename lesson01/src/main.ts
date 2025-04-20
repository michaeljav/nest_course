import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './all-exception.filter';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule, { bufferLogs: true }); //to use logger service globally
  const app = await NestFactory.create(AppModule);
  // app.useLogger(app.get('MyLoggerService')); //to use logger service globally

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter)); //to use global exception filter

  app.enableCors();
  app.setGlobalPrefix('api');

  await app.listen(3000);
}
bootstrap();
