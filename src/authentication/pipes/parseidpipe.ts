import { BadRequestException, PipeTransform } from '@nestjs/common';

export class parsePipe implements PipeTransform<string, number> {
  transform(value: string): number {
    const val = parseInt(value);
    if (isNaN(val)) throw new BadRequestException('id is mut be integer');
    if (val <= 0) throw new BadRequestException('id must be positive');
    return val;
  }
}
