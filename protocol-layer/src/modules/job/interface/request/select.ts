import { Context } from "../context";

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

interface Message {
    order: Order;
}

export interface IJobSelect {
    context: Context;
    message: Message;
}