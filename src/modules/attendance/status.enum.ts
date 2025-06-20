import { registerEnumType } from '@nestjs/graphql';

export enum Status {
  P = 'P',
  AP = 'AP',
  L = 'L',
  A = 'A',
}

registerEnumType(Status, {
  name: 'Status',
});
