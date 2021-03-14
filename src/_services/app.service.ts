import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): Object {
    return {
      welcome: 'Welcome to the ThemeParks API!',
      documentation: 'Find the documentation at /api',
    };
  }
}
