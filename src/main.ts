import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { I18nValidationExceptionFilter, I18nValidationPipe } from 'nestjs-i18n';
import { useContainer } from 'class-validator';
import { corsConfig, swaggerConfig } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  process.env.TZ = 'Asia/Jakarta';

  app.enableCors(corsConfig);
  app.enableVersioning();
  app.setGlobalPrefix(AppModule.apiPrefix);
  app.useGlobalPipes(new I18nValidationPipe({ transform: true }));
  app.useGlobalFilters(
    new I18nValidationExceptionFilter({
      detailedErrors: false,
    }),
  );
  swaggerConfig(app);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(AppModule.port);

  const hosted = `${AppModule.host}:${AppModule.port}/api/docs/web`;

  return hosted;
}

bootstrap().then((hosted: string) => {
  Logger.log(`App is running on: ${hosted}`);
});
