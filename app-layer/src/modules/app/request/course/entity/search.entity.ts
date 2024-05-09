import { Context } from '../interface/context';
import { ICourseSearch, Message } from '../interface/request/search';

export class CourseSearchPayload implements ICourseSearch {
  context: Context;
  message: Message;

  constructor(context: Context, message: Message) {
    (this.context = context), (this.message = message);
  }
}
