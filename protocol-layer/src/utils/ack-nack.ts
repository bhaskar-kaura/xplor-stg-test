import { Injectable } from '@nestjs/common';

interface Tag {
  code: string;
  name: string;
  value: string;
  display: boolean;
}

interface AckMessage {
  status: 'ACK' | 'NACK';
  tags?: Tag[];
}

interface ErrorMessage {
  type: string;
  code?: string;
  path?: string;
  message?: string;
}

@Injectable()
export class AckNackResponse {
  // Renamed from 'Response' to avoid conflict

  message: {
    ack: AckMessage;
  };
  error?: ErrorMessage;

  constructor(
    messageStatus: 'ACK' | 'NACK',
    errorType?: string,
    code?: string,
    errorMessage?: string,
    tags?: Tag[],
    path?: string,
  ) {
    this.message = {
      ack: {
        status: messageStatus,
        tags: tags,
      },
    };
    this.error = {
      type: errorType,
      code: code,
      path: path,
      message: errorMessage,
    };
  }
}
