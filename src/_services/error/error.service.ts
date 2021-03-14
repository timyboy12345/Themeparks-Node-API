import { Injectable } from '@nestjs/common';

@Injectable()
export class ErrorService {
  public static ThrowException(e: Error) {
    throw e;
  }
}
