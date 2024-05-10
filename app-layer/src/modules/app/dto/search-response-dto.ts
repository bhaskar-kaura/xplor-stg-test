import { Context } from '../request/course/interface/context';

export class SearchResponseDto {
  context: Context;
  message: {
    catalog: any;
  };
}
