import { Context } from '../context';

interface Descriptor {
  code?: string;
  name: string;
}

interface Item {
  descriptor: Descriptor;
}

interface Intent {
  item: Item;
}

export interface Message {
  intent: Intent;
}

export interface ICourseSearch {
  gatewayUrl?: string;
  context: Context;
  message: Message;
}
