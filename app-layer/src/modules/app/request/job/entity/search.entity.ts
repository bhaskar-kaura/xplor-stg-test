import { Context } from '../interface/context';
import { IJobSearch, Message } from '../interface/request/search';

export class JobSearchPayload implements IJobSearch {
  context: Context;
  message: Message;

  constructor(context: Context, message: Message) {
    (this.context = context), (this.message = message);
  }
}
