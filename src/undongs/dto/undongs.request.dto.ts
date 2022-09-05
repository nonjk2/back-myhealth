import { PickType } from '@nestjs/swagger';
import { Undong } from '../undongs.schema';

export class UndongRequestDto extends PickType(Undong, [
  'startdate',
  'name',
  'activetime',
  'sets',
  'enddate',
] as const) {
  id: string;
}
