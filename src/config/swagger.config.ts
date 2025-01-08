import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import {
  OpenAPIObject,
  OperationObject,
} from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

const web = {
  title: 'License generator (Web)',
  description: 'License generator (Web)',
} as const;

/**
 * Configures Swagger for the provided NestJS application.
 *
 * @param app {INestApplication} - The NestJS application instance.
 * @param apiVersion {string} - Optional version of the API.
 */
export function swaggerConfig(app: INestApplication, apiVersion?: string) {
  const webOptions = new DocumentBuilder()
    .setTitle(web.title)
    .setDescription(web.description)
    .setVersion(apiVersion)
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'Bearer',
    })
    .build();

  const webDocument = SwaggerModule.createDocument(app, webOptions);

  filterDocument(webDocument, 'web');

  if (
    process.env.NODE_ENV === 'demo' ||
    process.env.NODE_ENV === 'production'
  ) {
    app.use([
      `/api/docs/v${apiVersion}/web`,
      `/api/docs/v${apiVersion}/web-json`,
    ]);
  }

  SwaggerModule.setup(`api/docs/v${apiVersion}/web`, app, webDocument);
}

/**
 * Filters the swagger document based on the specifed platform on @ApiTags
 * For example: @ApiTags('web - auth')
 * And also removes paths and operations that do not belong to the platform.
 *
 * @param document {OpenAPIObject} - The OpenAPI document to filter.
 * @param platform {string} - The platform to filter the document for.
 */
function filterDocument(document: OpenAPIObject, platform: string) {
  Object.entries(document.paths).forEach(([pathKey, path]) => {
    Object.entries(path).forEach(([operationKey, operation]) => {
      const op = operation as OperationObject;
      if (!op.tags.some((tag) => tag.split(' - ')[0] === platform)) {
        delete document.paths[pathKey][operationKey];
      }
    });

    if (Object.keys(document.paths[pathKey]).length === 0) {
      delete document.paths[pathKey];
    }
  });
}
