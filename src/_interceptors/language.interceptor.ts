import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { LocaleService } from '../_services/locale/locale.service';
import { Request } from 'express';

@Injectable()
export class LanguageInterceptor implements NestInterceptor {
  constructor(protected _localeService: LocaleService) {
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: Request = context.switchToHttp().getRequest();

    if (request.query.lang && typeof request.query.lang === 'string') {
      this._localeService.setLocale(request.query.lang);
    }

    return next.handle();
  }
}
