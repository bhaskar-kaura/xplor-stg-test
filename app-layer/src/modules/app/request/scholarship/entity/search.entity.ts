import { Context } from '../interface/context';
import { IScholarshipSearch, Message } from '../interface/request/search';

export class ScholarshipSearchPayload implements IScholarshipSearch {
  context: Context;
  message: Message;

  constructor(context: Context, message: Message) {
    (this.context = context), (this.message = message);
  }
}
