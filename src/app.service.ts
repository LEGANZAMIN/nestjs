import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World! sungmin...';
  }

  getHi(): string {
    return 'HI...';
  }
}
