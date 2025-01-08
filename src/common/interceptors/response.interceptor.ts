import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  constructor(private readonly i18n: I18nService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const response = context.switchToHttp().getResponse();
        const statusCode = response.statusCode || HttpStatus.OK;
        let message = '';

        const httpMethod = context.switchToHttp().getRequest().method;
        const isLoginRequest = context.getHandler().name === 'login';
        const isRegisterRequest = context.getHandler().name === 'register';

        if (isLoginRequest) {
          message = this.i18n.t('general.shared.responses.loginSuccess');
          return {
            statusCode,
            message,
            data,
          };
        }

        if (isRegisterRequest) {
          message = this.i18n.t('general.shared.responses.registerSuccess');
          return {
            statusCode,
            message,
            data,
          };
        }

        switch (httpMethod) {
          case 'GET':
            message = this.i18n.t('general.shared.responses.successGet');
            break;
          case 'POST':
            message = this.i18n.t('general.shared.responses.successPost');
            break;
          case 'PATCH':
          case 'PUT':
            message = this.i18n.t('general.shared.responses.successPut');
            break;
          case 'DELETE':
            message = this.i18n.t('general.shared.responses.successDelete');
            break;
          default:
            message = this.i18n.t('general.shared.responses.success');
            break;
        }

        return {
          statusCode,
          message,
          data,
        };
      }),
    );
  }
}
