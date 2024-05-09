import { Injectable } from '@nestjs/common';
import { SearchRequestDto } from './dto/search-request.dto';

import { OndcContext, OnestContext } from 'src/util/context.builder';
import { GlobalActionService } from 'src/common/action/global-action';
import { AckNackResponse } from 'src/common/action/ack-nack.entity';

@Injectable()
export class AppService {
  constructor(private readonly globalActionService: GlobalActionService) {}
  getHello(): string {
    return 'Hello World!';
  }

  async search(searchRequest: SearchRequestDto) {
    try {
      await this.globalActionService.globalSearch(
        searchRequest.domain,
        searchRequest.context,
        searchRequest.message,
      );
      return  new AckNackResponse("ACK");
    } catch (error) {
      console.log(JSON.stringify(error?.response?.data));
      throw error?.response;
    }
  }
  async onSearch(response: OnestContext | OndcContext | any) {
    console.log(
      `response ${response?.context?.domain}`,
      JSON.stringify(response),
    );
  }
}
