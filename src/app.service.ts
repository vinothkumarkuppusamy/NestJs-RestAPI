import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  get(arg0: string): string {
    throw new Error('Method not implemented.');
  }
  getHello(): string {
    return 'App working Properly';
  }
}
