import { Context } from '../context';

interface Provider {
  id: string;
}

interface Item {
  id: string;
}

interface Order {
  provider: Provider;
  items: Item[];
}

export interface ICourseSelectMessage {
  order: Order;
}

export interface ICourseSelect {
  context: Context;
  message: ICourseSelectMessage;
}
