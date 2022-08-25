import { PickType } from '@nestjs/swagger';
import { Undong } from '../undongs.schema';

export class UndongRequestDto extends PickType(Undong, [
  'Myid',
  'startdate',
  'name',
  'activetime',
  'sets',
] as const) {
  id: string;
}
